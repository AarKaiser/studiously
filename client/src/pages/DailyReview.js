import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { getMe } from '../utils/API';
import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';

import ReviewButtons from '../components/Daily Review/ReviewButtons';
import Questions from '../components/Daily Review/Questions';
// import { GET_GOAL } from '../utils/mutations'

import ProtectedRoute from '../components/ProtectedRoute';

const DailyReview = () => {
  const [userData, setUserData] = useState([]);

  const { loading, error, data } = useQuery(QUERY_ME);

  useEffect(() => {
    setUserData(data);
  }, [data]);

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
        <Questions userData={userData} />
      </Container>
      <br />

      <Container>
        <ReviewButtons />
      </Container>
    </ProtectedRoute>
  );
};

export default DailyReview;
