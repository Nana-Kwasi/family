package com.mamaafrica.ai.prompt;

import com.mamaafrica.ai.conversation.Message;
import com.mamaafrica.ai.conversation.MessageRole;
import com.mamaafrica.ai.language.Language;
import com.mamaafrica.ai.settings.SettingsService;
import dev.langchain4j.data.message.AiMessage;
import dev.langchain4j.data.message.ChatMessage;
import dev.langchain4j.data.message.SystemMessage;
import dev.langchain4j.data.message.UserMessage;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

/**
 * Assembles the message list sent to the model:
 * system prompt (+ retrieved knowledge) → prior turns → the new user message.
 */
@Component
public class PromptBuilder {

    private final SettingsService settings;

    public PromptBuilder(SettingsService settings) {
        this.settings = settings;
    }

    /**
     * @param history earlier messages of the conversation, oldest first
     * @param context knowledge-base snippets; empty when retrieval found nothing relevant
     */
    /**
     * What is actually known about the person asking. Everything here came either from a
     * verified account or from a name they typed in; nothing is inferred.
     *
     * @param signedIn whether these facts come from an account rather than from the page
     */
    public record VisitorFacts(String preferredName, String fullName, String akanName,
                               String dayBorn, boolean signedIn) {

        static final VisitorFacts ANONYMOUS = new VisitorFacts(null, null, null, null, false);

        boolean hasName() {
            return preferredName != null && !preferredName.isBlank();
        }
    }

    public List<ChatMessage> build(String userMessage, Language language, List<Message> history,
                                   List<String> context) {
        return build(userMessage, language, history, context, VisitorFacts.ANONYMOUS);
    }

    public List<ChatMessage> build(String userMessage, Language language, List<Message> history,
                                   List<String> context, VisitorFacts visitor) {
        List<ChatMessage> messages = new ArrayList<>();
        messages.add(SystemMessage.from(systemPrompt(language, context,
                visitor == null ? VisitorFacts.ANONYMOUS : visitor)));

        for (var message : history) {
            messages.add(message.getRole() == MessageRole.USER
                    ? UserMessage.from(message.getContent())
                    : AiMessage.from(message.getContent()));
        }

        messages.add(UserMessage.from(userMessage));
        return messages;
    }

    /** A fact for the prompt's list, or an explicit UNKNOWN — never a blank that invites a guess. */
    private static String known(String value) {
        return (value == null || value.isBlank()) ? "UNKNOWN — ask them if it matters." : value.trim();
    }

    private String systemPrompt(Language language, List<String> context, VisitorFacts visitor) {
        var prompt = new StringBuilder(settings.effective().systemPrompt().trim());

        prompt.append("\n\nRespond entirely in ").append(language.displayName()).append(".");

        // --- Who you are talking to -----------------------------------------------------
        // Stated as a closed list of facts rather than a hint. Left vaguer than this, the
        // model fills the gaps: asked "what is my name?" by someone it knew nothing about,
        // it invented a date of birth and derived an Akan name from it.
        prompt.append("\n\nABOUT THE PERSON YOU ARE SPEAKING WITH — this is everything you know. ")
              .append("Treat anything not listed here as unknown:\n");

        if (visitor.hasName()) {
            prompt.append("- They are called ").append(visitor.preferredName().trim())
                  .append(visitor.signedIn() ? " (from their account).\n" : " (they typed this in; it is how to address them, not proof of identity).\n");
        } else {
            prompt.append("- Their name: UNKNOWN.\n");
        }
        prompt.append("- Their Akan day name: ")
              .append(known(visitor.akanName())).append('\n');
        prompt.append("- The day of the week they were born: ")
              .append(known(visitor.dayBorn())).append('\n');
        prompt.append("- Their date of birth: UNKNOWN. You are never told it.\n");

        prompt.append("""
                Never state, guess or imply any of the UNKNOWN facts. Do not say "based on your \
                date of birth", "based on your birthdate", or anything similar — you have never \
                been given it. If they told you a day of the week, say "you were born on a \
                Tuesday, so..." and nothing more. An Akan day name comes from the day that \
                person was born, never from today's date.
                """);

        // --- The one table that must never be wrong ---------------------------------------
        // This lives in the prompt rather than in the knowledge base because retrieval is a
        // similarity search: ask "what is my name?" and the day-name table may simply not come
        // back. It did not, and the assistant confidently told a Tuesday-born they were Kwadwo,
        // which is Monday. The whole site is built on this mapping; it cannot be probabilistic.
        prompt.append("""

                AKAN DAY NAMES — use only this table, never your own recollection:
                  Sunday    - male Kwasi (or Kwesi),  female Akosua
                  Monday    - male Kwadwo (or Kojo),  female Adwoa (or Adjoa)
                  Tuesday   - male Kwabena,           female Abena
                  Wednesday - male Kwaku,             female Akua
                  Thursday  - male Yaw,               female Yaa
                  Friday    - male Kofi,              female Afia
                  Saturday  - male Kwame,             female Ama
                If you do not know whether they are male or female, give both names for that day \
                rather than picking one. If you are unsure of the day, ask — do not guess a name.
                """);

        // --- How to hold a conversation ---------------------------------------------------
        prompt.append("""

                HOW TO TALK:
                - Have a real conversation. Ask a question back when the answer depends on \
                something you were not told, and then use what they tell you.
                - Ask one thing at a time. Two questions in a row is an interrogation.
                - When you can answer part of a question, answer that part first, then ask for \
                what is missing — but only when the missing thing is needed for THAT question. \
                Asking someone their day of birth after they asked about Ghanaian history is a \
                non sequitur; do not append it to unrelated answers.
                - Ask about their day born only when the conversation is about them, their name, \
                or their own heritage.
                - When they give you something — a day, a date, a name — use it in your next \
                answer instead of asking again. Read back over what has already been said.
                - Say plainly when you do not know or cannot see something, and say what would \
                let you help. Never fill a gap with an invention.
                - Warm and unhurried, like an elder with time for you. Short paragraphs.
                """);

        if (!context.isEmpty()) {
            prompt.append("\n\nKnowledge base excerpts — prefer these over your own recollection:\n");
            for (int i = 0; i < context.size(); i++) {
                prompt.append("\n[").append(i + 1).append("] ").append(context.get(i).trim()).append('\n');
            }
        }

        return prompt.toString();
    }
}
