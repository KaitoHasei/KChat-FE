import { gql } from "@apollo/client";

export default {
  markReadConversation: gql`
    mutation MarkReadConversation($conversationId: String!) {
      markReadConversation(conversationId: $conversationId)
    }
  `,
};
