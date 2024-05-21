import { gql } from '@apollo/client';

// get all users
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

// Get logged in user
export const GET_ME = gql`
  query getMe {
    me {
      username
      email
      savedBooks {
        title
        description
        image
        bookId
        authors
      }
    }
  }
`;

// Get single user
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
