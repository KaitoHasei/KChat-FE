import { gql } from "@apollo/client";

export default {
  changeUserName: gql`
    mutation ChangeUserName($userName: String!) {
      changeUserName(userName: $userName) {
        success
        message
      }
    }
  `,
};
