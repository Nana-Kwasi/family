package com.mamaafrica.ai.chat;

import com.mamaafrica.ai.chat.dto.ChatRequest;
import com.mamaafrica.ai.security.CustomerPrincipal;
import com.mamaafrica.ai.chat.dto.ChatResponse;
import com.mamaafrica.ai.common.AiServiceException;
import com.mamaafrica.ai.conversation.Conversation;
import com.mamaafrica.ai.conversation.ConversationService;
import com.mamaafrica.ai.conversation.Message;
import com.mamaafrica.ai.language.Language;
import com.mamaafrica.ai.knowledge.KnowledgeRetriever;
import com.mamaafrica.ai.language.LanguageDetector;
import com.mamaafrica.ai.prompt.PromptBuilder;
import com.mamaafrica.ai.settings.ChatModelProvider;
import com.mamaafrica.ai.settings.SettingsService;
import dev.langchain4j.data.message.ChatMessage;
import dev.langchain4j.model.chat.response.StreamingChatResponseHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.function.Consumer;

/**
 * The chat pipeline:
 * detect language → retrieve knowledge → build prompt → call the model → save the exchange.
 */
@Service
public class ChatService {

    private static final Logger log = LoggerFactory.getLogger(ChatService.class);

    private final ChatModelProvider models;
    private final LanguageDetector languageDetector;
    private final PromptBuilder promptBuilder;
    private final ConversationService conversations;
    private final KnowledgeRetriever knowledgeRetriever;
    private final SettingsService settings;

    public ChatService(ChatModelProvider models,
                       LanguageDetector languageDetector,
                       PromptBuilder promptBuilder,
                       ConversationService conversations,
                       KnowledgeRetriever knowledgeRetriever,
                       SettingsService settings) {
        this.models = models;
        this.languageDetector = languageDetector;
        this.promptBuilder = promptBuilder;
        this.conversations = conversations;
        this.knowledgeRetriever = knowledgeRetriever;
        this.settings = settings;
    }

    public ChatResponse chat(ChatRequest request) {
        var turn = prepare(request);

        var startedAt = System.currentTimeMillis();
        String answer;
        try {
            answer = models.chatModel().chat(turn.prompt()).aiMessage().text();
        } catch (RuntimeException e) {
            throw new AiServiceException(
                    "The AI model (%s) is unavailable right now".formatted(settings.effective().model()), e);
        }
        var latency = System.currentTimeMillis() - startedAt;

        save(turn, answer, latency);
        log.info("Chat completed conversation={} language={} latency={}ms",
                turn.conversation().getId(), turn.language(), latency);

        return new ChatResponse(answer, turn.conversation().getId(), turn.language(),
                settings.effective().model(), latency, Instant.now());
    }

    /**
     * Streams tokens as they are produced. The exchange is saved once the model finishes.
     *
     * @param onToken    receives each partial chunk
     * @param onComplete receives the assembled response
     * @param onError    receives any provider failure
     */
    public void chatStream(ChatRequest request,
                           Consumer<String> onToken,
                           Consumer<ChatResponse> onComplete,
                           Consumer<Throwable> onError) {
        var turn = prepare(request);
        var startedAt = System.currentTimeMillis();

        models.streamingChatModel().chat(turn.prompt(), new StreamingChatResponseHandler() {

            @Override
            public void onPartialResponse(String partial) {
                onToken.accept(partial);
            }

            @Override
            public void onCompleteResponse(dev.langchain4j.model.chat.response.ChatResponse response) {
                var latency = System.currentTimeMillis() - startedAt;
                var answer = response.aiMessage().text();
                try {
                    save(turn, answer, latency);
                    onComplete.accept(new ChatResponse(answer, turn.conversation().getId(), turn.language(),
                            settings.effective().model(), latency, Instant.now()));
                } catch (RuntimeException e) {
                    onError.accept(e);
                }
            }

            @Override
            public void onError(Throwable error) {
                log.error("Streaming chat failed for conversation {}", turn.conversation().getId(), error);
                onError.accept(error);
            }
        });
    }

    private Turn prepare(ChatRequest request) {
        var language = languageDetector.resolve(request.language(), request.message());
        var conversation = conversations.findOrCreate(request.conversationId(), language, request.message());
        var history = conversations.recentHistory(conversation.getId());
        var knowledge = knowledgeRetriever.retrieveContext(request.message());

        var prompt = promptBuilder.build(request.message(), language, history, knowledge, visitorFacts(request));
        return new Turn(conversation, language, request.message(), prompt);
    }

    /**
     * What Afia should call this visitor. A signed-in customer's name comes from their
     * verified token; an anonymous one may suggest a name in the request body, which is only
     * ever used as a form of address and never trusted as identity.
     */
    private static PromptBuilder.VisitorFacts visitorFacts(ChatRequest request) {
        var auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.getPrincipal() instanceof CustomerPrincipal customer) {
            return new PromptBuilder.VisitorFacts(
                    customer.preferredName(), customer.fullName(), customer.akanName(), customer.dayBorn(), true);
        }
        // Anonymous: a name typed into the page is a form of address, not identity, and
        // nothing else about this person is known.
        return new PromptBuilder.VisitorFacts(request.visitorName(), null, null, null, false);
    }

    private void save(Turn turn, String answer, long latencyMs) {
        var conversationId = turn.conversation().getId();
        conversations.recordExchange(
                turn.conversation(),
                Message.user(conversationId, turn.userMessage(), turn.language()),
                Message.assistant(conversationId, answer, turn.language(), settings.effective().model(), latencyMs),
                settings.effective().model(),
                settings.effective().provider().name());
    }

    private record Turn(Conversation conversation, Language language, String userMessage,
                        List<ChatMessage> prompt) {
    }
}
