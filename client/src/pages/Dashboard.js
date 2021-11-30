import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import "./Dashboard.css";
import ProtectedRoute from "../components/ProtectedRoute";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import useGraph from "./hooks/use-graph";

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
  const {
    data: { time, completed, goal },
    options,
  } = useGraph();

  return (
    <ProtectedRoute page={{ name: "Dashboard", url: "dashboard" }}>
      <div className="flex mt-32">
        <Container style={{ marginBottom: "2rem" }}>
          <Line options={options} data={goal} />
        </Container>
        <Container style={{ marginBottom: "2rem" }}>
          <Line options={options} data={completed} />
        </Container>
        <Container style={{ marginBottom: "2rem" }}>
          <Line options={options} data={time} />
        </Container>
      </div>
    </ProtectedRoute>
  );
};

export default SavedGoals;
