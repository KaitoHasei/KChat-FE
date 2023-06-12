import { gql } from "@apollo/client";

export default {
  getConversations: (fragment) => gql`
    query GetConversations {
      getConversations {
        ${fragment}
      }
    }
  `,
};
