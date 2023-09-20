import { gql } from "@apollo/client";

export default {
  sendMessage: gql`
    mutation SendMessage($inputs: SendMessageInput!) {
      sendMessage(inputs: $inputs)
    }
  `,
};
