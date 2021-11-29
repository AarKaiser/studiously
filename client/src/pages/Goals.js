import "./Goals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Form, Button, Alert } from "react-bootstrap";

import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import Auth from "../utils/auth";
import { SAVE_GOAL, REMOVE_GOAL } from "../utils/mutations";
import { QUERY_ME } from "../utils/queries";
// import { REMOVE_GOAL } from '../utils/mutations';

import ProtectedRoute from "../components/ProtectedRoute";
import { Link } from "react-router-dom";

function Goals(props) {
  // set initial form state
  const [userFormData, setUserFormData] = useState({
    name: "",
    description: "",
    timer: "",
  });
  const { userError, loading, data } = useQuery(QUERY_ME);
  const [userData, setUserData] = useState();
  const [saveGoal, { error: saveGoalError }] = useMutation(SAVE_GOAL);
  const [removeGoal, { error: removeGoalError }] = useMutation(REMOVE_GOAL);
  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState("");

  // console.log(userData);

  // Show alert effect
  useEffect(() => {
    if (error.length !== 0) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [error]);

  useEffect(() => {
    if (!loading && data.me) {
      setUserData(data.me);
    }
  }, [loading]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const { name, description, timer } = userFormData;

    // form validation
    if (
      name.trim().length === 0 ||
      description.trim().length === 0 ||
      timer.trim().length === 0
    ) {
      setError("All fields are required!");
      setShowAlert(true);
      return;
    }

    const duration = timer.split(":");

    // form validation
    if (duration.length !== 3) {
      setError("Provide the correct format on the goal duration e.g 02:30:00");
      setShowAlert(true);
      return;
    }

    if (duration.find((item) => Number(item) === NaN)) {
      setError("Provide the current format with only numbers");
      setShowAlert(true);
      return;
    }

    try {
      const mutationResponse = await saveGoal({
        variables: {
          goalData: {
            name: userFormData.name,
            description: userFormData.description,
            duration: userFormData.timer,
          },
        },
      });
      setUserFormData({ name: "", description: "", timer: "" });
      setUserData(mutationResponse.data.saveGoal);
      setShowAlert(false);
      setError("");
    } catch (err) {
      console.log(err);
    }
  };

  // Delete goal handler
  const removeGoalHandler = async (goalId) => {
    try {
      const mutationResponse = await removeGoal({
        variables: { goalId },
      });
      setUserData(mutationResponse.data.removeGoal);
    } catch (err) {
      console.log(err);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({
      ...userFormData,
      [name]: value,
    });
  };

  return (
    <ProtectedRoute page={{ name: "Goals", url: "goals" }}>
      {/* This is needed for the validation functionality above */}
      <Form noValidate onSubmit={handleFormSubmit}>
        {/* show alert if server response is bad */}
        <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger"
        >
          {error}
        </Alert>

        <Form.Group>
          <Form.Label className="goals-title mt-24" htmlFor="name">
            Your Goal
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="eg: Be ready for math test."
            name="name"
            onChange={handleInputChange}
            value={userFormData.name}
            required
            className="w-96"
          />
          <Form.Control.Feedback type="invalid">
            Please give you goal a name!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label className="goals-title" htmlFor="email">
            Description
          </Form.Label>
          <Form.Control
            type="description"
            placeholder="eg: Study modules 1 and 2. "
            name="description"
            onChange={handleInputChange}
            value={userFormData.description}
            required
            className="w-96 h-32"
          />
          <Form.Control.Feedback type="invalid">
            Please give you goal a description!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label className="goals-title" htmlFor="timer">
            Goal Duration
          </Form.Label>
          <Form.Control
            type="timer"
            placeholder="eg: 2:30:00 (HH:MM:SS)."
            name="timer"
            onChange={handleInputChange}
            value={userFormData.timer}
            required
            className="w-96"
          />
          <Form.Control.Feedback type="invalid">
            Please give you goal a description!
          </Form.Control.Feedback>
        </Form.Group>

        <Button
          // disabled={!(userFormData.name && userFormData.description)}
          type="submit"
          variant="success"
          className="goals-submit"
        >
          Submit
        </Button>

        <div className="flex justify-center space-x-10">
          <Link to="/timer" className="goals-srt-achieve justify-center">
            Start Achieving!
          </Link>
        </div>
      </Form>

      <div>
        <h2>
          <strong>Your Goals</strong>
        </h2>
        {loading && <h2>Loading goals..</h2>}
        {!loading && userError && <h2>Something went wrong!</h2>}
        {userData && userData.savedGoals && userData.savedGoals.length === 0 && (
          <h1>
            <strong>You haven't set any goal yet.</strong>
          </h1>
        )}
        {userData &&
          userData.savedGoals &&
          userData.savedGoals.length !== 0 &&
          userData.savedGoals.map((goal) => {
            return (
              <div className="card saved-goals" key={goal._id}>
                <li className="list-group-item">
                  <span>
                    <button
                      className="delete-goal-btn"
                      onClick={removeGoalHandler.bind(null, goal._id)}
                    >
                      🗑️
                    </button>{" "}
                    {goal.name}{" "}
                  </span>
                  <span>{goal.duration}</span>
                </li>
              </div>
            );
          })}
      </div>
    </ProtectedRoute>
  );
}

export default Goals;
