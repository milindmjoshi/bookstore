import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query getUsers {
    users {
      username
      email
      savedBooks {
        title
        bookId
        authors
        image
      }
      bookCount
    }
  }
`;

export const GET_ME = gql`
  query me {
    user {
      username
      email
      password
    }
  }
`;

export const QUERY_SINGLE_USER = gql`
  query getSingleUser($username: String!) {
    user(username: $username) {
      username
      email
      password
      savedBooks {
        authors
        bookId
        description
        image
        title
      }
    }
  }
`;
