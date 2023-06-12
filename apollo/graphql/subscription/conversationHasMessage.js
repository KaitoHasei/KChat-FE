import { gql } from "@apollo/client";

export default {
  conversationHasMessage: gql`
    subscription ConversationHasMessage {
      conversationHasMessage {
        id
        participants {
          id
          name
          image
        }
        lastMessage {
          userId
          content
          createdAt
        }
        image
        userHaveSeen
        createdBy
      }
    }
  `,
};
