import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { getMe } from '../utils/API';
import Auth from '../utils/auth';

import ReviewButtons from '../components/Daily Review/ReviewButtons';
import Questions from '../components/Daily Review/Questions';
// import { GET_GOAL } from '../utils/mutations'

import ProtectedRoute from '../components/ProtectedRoute';

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
    <ProtectedRoute>
      <Container className="daily-review">
        <h1>DAILY REVIEW</h1>
        <br />
        <h2>Congratulations on completing a productive day!🎉</h2>
        <br />
        <h2>Were you able to achieve your goals today?</h2>
      </Container>
      <br />

      <Container>
        <Questions />
      </Container>
      <br />

      <Container>
        <ReviewButtons />
      </Container>
    </ProtectedRoute>
  );
};

export default DailyReview;
