import { gql } from "@apollo/client";

export default {
  searchUsers: gql`
    query SearchUsers($searchTerms: String!) {
      searchUsers(searchTerms: $searchTerms) {
        id
        name
        image
      }
    }
  `,
};
