import { gql } from "@apollo/client";

export default {
  createConversation: (fragment) => gql`
    mutation CreateConversation($listUserId: [String]!) {
      createConversation(listUserId: $listUserId) {
        ${fragment}
      }
    }
  `,
};
