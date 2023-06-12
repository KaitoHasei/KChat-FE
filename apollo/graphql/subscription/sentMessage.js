import { gql } from "@apollo/client";

export default {
  sentMessage: gql`
    subscription SentMessage($conversationId: String!) {
      sentMessage(conversationId: $conversationId) {
        conversationId
        message {
          userId
          content
          createdAt
        }
      }
    }
  `,
};
