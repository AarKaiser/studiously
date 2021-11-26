import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
import { getMe } from '../utils/API';
import Auth from '../utils/auth';
// import Questions from '../components/Questions';
// import { GET_GOAL } from '../utils/mutations'

const DailyReview = () => {
  const [userData, setUserData] = useState({});

  // use this to determine if `useEffect()` hook needs to run again
  const userDataLength = Object.keys(userData).length;

  useEffect(() => {
    const getUserData = async () => {
      try {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
          return false;
        }

        const response = await getMe(token);

        if (!response.ok) {
          throw new Error('something went wrong!');
        }

        const user = await response.json();
        setUserData(user);
      } catch (err) {
        console.error(err);
      }
    };

    getUserData();
  }, [userDataLength]);



  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Daily Review</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>Were you able to achieve your goals today?</h2>
        
      </Container>
    </>
  );
};

export default DailyReview;
