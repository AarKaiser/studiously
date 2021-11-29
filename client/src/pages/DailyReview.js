import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { getMe } from '../utils/API';
import Auth from '../utils/auth';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { SET_COMPLETED_GOAL } from '../utils/mutations';
import './DailyReview.css';
import ReviewButtons from '../components/Daily Review/ReviewButtons';
import Questions from '../components/Daily Review/Questions';
// import { GET_GOAL } from '../utils/mutations'

import ProtectedRoute from '../components/ProtectedRoute';

const DailyReview = () => {
  const [userData, setUserData] = useState([]);

  const { loading, error: queryError, data } = useQuery(QUERY_ME);
  const [setCompletedGoal, { error: mutationError }] =
    useMutation(SET_COMPLETED_GOAL);

  const completedGoalHandler = async (goalId, completed) => {
    try {
      const mutationResponse = await setCompletedGoal({
        variables: { goalId, completed },
      });
      setUserData(mutationResponse.data.setCompletedGoal);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setUserData(data);
  }, [data]);

  return (
    <ProtectedRoute page={{ name: 'Daily Review', url: 'dailyreview' }}>
      <div className="dailyreview-container">
      <Container className="daily-review">
        <h1>DAILY REVIEW</h1>
        <br />
        <h2>Congratulations on completing a productive day!🎉Were you able to achieve your goals today?
      </h2>
      </Container>
      <br />

      <Container>
        <Questions
          userData={userData}
          setCompletedGoal={completedGoalHandler}
        />
      </Container>
      <br />

      <Container>
        <ReviewButtons />
      </Container>
      </div>
    </ProtectedRoute>
  );
};

export default DailyReview;
