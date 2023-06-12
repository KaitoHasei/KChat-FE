import { gql } from "@apollo/client";

export default {
  conversationCreated: (fragment) => gql`
        subscription ConversationCreated {
            conversationCreated {
                ${fragment}
            }
        }
    `,
};
