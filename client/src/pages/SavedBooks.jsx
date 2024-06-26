//import { useState, useEffect } from 'react';

import {useQuery, useMutation} from '@apollo/client';
import { GET_ME  } from '../utils/queries';
import { REMOVE_BOOK } from '../utils/mutations';

import {
  Container,
  Card,
  Button,
  Row,
  Col
} from 'react-bootstrap';

//import { getMe, deleteBook } from '../utils/API';
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';

const SavedBooks = () => {
  
  //const [userData, setUserData] = useState({});
  let userData;
  // use this to determine if `useEffect()` hook needs to run again
  //const userDataLength = Object.keys(userData).length;
  console.log("Calling get me");
   
    
    const { loading, data } = useQuery(GET_ME); 
    if (data){
      console.log("Data:" + JSON.stringify(data));
      console.log("data1 user: " + JSON.stringify(data.me));
      userData = data.me;
      console.log("User Data: " + JSON.stringify(userData));
    }

  // Important for useMutation: We pass the mutation we'd like to execute to the useMutation hook
  // The useMutation hook returns an array. The function at index 0 can be dispatched within the component to trigger the mutation query
  // The object at index 1 contains information, such as the error boolean, which we use in this application
  const [removeBook, { error }] = useMutation(REMOVE_BOOK);
  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      console.log("Removing book failed, not logged in");
      return false;
    }

    try {
      console.log("Removing book");
      console.log("User is: " + Auth.getProfile().data.username);
      console.log("Book Id is: " + bookId);
      const {data} = await removeBook({
        variables: {username: Auth.getProfile().data.username, bookId: bookId},
      });

      console.log("Data: " + JSON.stringify(data));

      userData = data.me;
      // upon success, remove book's id from localStorage
      removeBookId(bookId);
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <div fluid className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <Row>
          {userData.savedBooks.map((book) => {
            return (
              <Col md="4">
                <Card key={book.bookId} border='dark'>
                  {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className='small'>Authors: {book.authors}</p>
                    <Card.Text>{book.description}</Card.Text>
                    <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                      Delete this Book!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;
