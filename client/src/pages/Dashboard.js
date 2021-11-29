import React, { useState, useEffect } from 'react';
import {
  Jumbotron,
  Container,
  CardColumns,
  Card,
  Button,
} from 'react-bootstrap';
import './Dashboard.css';

import { getMe, deleteGoal } from '../utils/API';
import Auth from '../utils/auth';
import { removeGoalId } from '../utils/localStorage';
import { QUERY_ME } from '../utils/queries';
import { useQuery } from '@apollo/client';
import ProtectedRoute from '../components/ProtectedRoute';

const SavedGoals = () => {
  const [userData, setUserData] = useState({});

  const { loading, error, data } = useQuery(QUERY_ME);

  useEffect(() => {}, []);

  // if data isn't here yet, say so
  // if (!userDataLength) {
  //   return <h2>This is the dashboard. This is for goal data</h2>;
  // }

  return (
    <ProtectedRoute page={{ name: 'Dashboard', url: 'dashboard' }}>
      <Container>
        <h1>Dashboard Page</h1>
        <table style={{ width: '100%' }} className="graph">
          <tbody>
            <tr>
              <th className="tb-head">Daily</th>
              <td>Contact</td>
              <td>Country</td>
            </tr>
            <tr>
              <th className="tb-head">Weekly</th>
              <td>Maria Anders</td>
              <td>Germany</td>
            </tr>
            <tr>
              <th className="tb-head">Month</th>
              <td>Francisco Chang</td>
              <td>Mexico</td>
            </tr>
          </tbody>
        </table>
      </Container>
    </ProtectedRoute>
  );
};

export default SavedGoals;
