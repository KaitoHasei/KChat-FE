import { gql } from "@apollo/client";

export default {
  markAsRead: gql`
    mutation MarkAsRead($conversationId: String!) {
      markAsRead(conversationId: $conversationId)
    }
  `,
};
