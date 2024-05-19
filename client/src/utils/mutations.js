import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      username
      email
      password
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook(username: String!, bookId: String!, title: !String, description: !String, authors: [String], image: !String) {
    saveBook(username: $username, bookId: $bookId, title: $title, description: $description, authors: $authors, image: $image) {
      username
      books {
        bookId
        title
        description
        authors
        image
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook(username: String!, bookId: String!) {
    removeBook(username: $username, bookId: $bookId){
      username
      books {
        bookId
        title
        description
        authers
        image
      }
    }
  }
`
