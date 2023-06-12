import { gql } from "@apollo/client";

export default {
  retrieveConversation: gql`
    query RetrieveConversation($conversationId: String!) {
      retrieveConversation(conversationId: $conversationId) {
        id
        participants {
          id
          name
          image
        }
        image
        userHaveSeen
        createdBy
      }
    }
  `,
};
