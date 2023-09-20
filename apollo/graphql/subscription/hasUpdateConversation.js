import { gql } from "@apollo/client";

export default {
  hasUpdateConversation: gql`
    subscription HasUpdateConversation {
      hasUpdateConversation {
        conversation {
          id
          participants {
            id
            name
            image
          }
          latestMessage {
            userId
            content
            createdAt
          }
          name
          image
          userIdsHaveSeen
          createdBy
        }
        actionUpdate
      }
    }
  `,
};
