import { gql } from "@apollo/client";

export default {
  getConversationMessages: gql`
    query GetConversationMessages($inputs: GetConversationMessagesInput!) {
      getConversationMessages(inputs: $inputs) {
        userId
        content
        createdAt
      }
    }
  `,
};
