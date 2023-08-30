import { gql } from "@apollo/client";

export default {
  createConversation: gql`
    mutation CreateConversation($listUserId: [String]!) {
      createConversation(listUserId: $listUserId) {
        id
        participantIds
        participants {
          id
          name
          image
        }
        name
        image
        createdBy
      }
    }
  `,
};
