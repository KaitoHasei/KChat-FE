import { gql } from "@apollo/client";

export default {
  searchUsers: gql`
    query SearchUsers($searchTerms: String!) {
      searchUsers(searchTerms: $searchTerms) {
        users {
          id
          name
          email
          image
        }
      }
    }
  `,
};
