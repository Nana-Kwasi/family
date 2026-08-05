package com.mamaafrica.ai.conversation.dto;

import com.mamaafrica.ai.conversation.Conversation;
import com.mamaafrica.ai.conversation.Message;

import java.util.List;

public record ConversationDetail(
        ConversationSummary conversation,
        List<MessageResponse> messages
) {

    public static ConversationDetail of(Conversation conversation, List<Message> messages) {
        return new ConversationDetail(
                ConversationSummary.from(conversation),
                messages.stream().map(MessageResponse::from).toList());
    }
}
