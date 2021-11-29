import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import './Dashboard.css';
import ProtectedRoute from '../components/ProtectedRoute';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import useGraph from './use-graph';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SavedGoals = () => {
  const [userData, setUserData] = useState({});
  const { data, options } = useGraph();
  // daily example
  // Get today goal
  // filter the completed
  // numOfCompleted / totalNumber of todays goal

  return (
    <ProtectedRoute page={{ name: 'Dashboard', url: 'dashboard' }}>
      <Container>
        <Line data={data} options={options} />
      </Container>
    </ProtectedRoute>
  );
};

export default SavedGoals;
