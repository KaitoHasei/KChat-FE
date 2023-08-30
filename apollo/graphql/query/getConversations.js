import { gql } from "@apollo/client";

export default {
  getConversations: gql`
    query GetConversations {
      getConversations {
        id
        participants {
          id
          name
          image
        }
        name
        image
        latestMessage {
          userId
          content
          createdAt
        }
        userIdsHaveSeen
        createdBy
      }
    }
  `,
};
