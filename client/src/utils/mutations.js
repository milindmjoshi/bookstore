import { gql } from '@apollo/client';

// Add User
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        username
        email
      }
    }
  }
`;

// Login User
export const LOGIN_USER = gql`
  mutation login( $email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

// Save Book 
export const SAVE_BOOK = gql`
  mutation saveBook($username: String!, $bookId: String!, $title: String!, $description: String!, $authors: [String], $image: String!) {
    saveBook(username: $username, bookId: $bookId, title: $title, description: $description, authors: $authors, image: $image) {
      username
    }
  }
`;

// Remove book
export const REMOVE_BOOK = gql`
  mutation removeBook($username: String!, $bookId: String!) {
    removeBook(username: $username, bookId: $bookId){
      username
      savedBooks {
        title
        image
        description
        bookId
        authors
      }
    }
  }
`
