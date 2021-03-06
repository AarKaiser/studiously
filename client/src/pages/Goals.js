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
import isSameDay from "../utils/is-same-day";

function Goals(props) {
  // set initial form state
  const [userFormData, setUserFormData] = useState({
    name: "",
    description: "",
    timer: "",
  });
  const { userError, loading, data } = useQuery(QUERY_ME);
  const [goalsToday, setGoalsToday] = useState([]);
  const [saveGoal, { error: saveGoalError }] = useMutation(SAVE_GOAL);
  const [removeGoal, { error: removeGoalError }] = useMutation(REMOVE_GOAL);
  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState("");

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
      const todaysGoal = data.me.savedGoals.filter((goal) => {
        const today = new Date();
        const goalDate = new Date(goal.dateCreated);
        return isSameDay(today, goalDate);
      });
      setGoalsToday(todaysGoal);
    }
  }, [loading, data]);

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
      setGoalsToday(
        mutationResponse.data.saveGoal.savedGoals.filter((goal) => {
          return isSameDay(new Date(), new Date(goal.dateCreated));
        })
      );
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
      setGoalsToday(
        mutationResponse.data.saveGoal.removeGoal.filter((goal) => {
          return isSameDay(new Date(), new Date(goal.dateCreated));
        })
      );
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
      <div className="bg-img-goals">
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
            <Form.Label className="goals-title mt-12" htmlFor="name">
              Your Goal
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="eg: Be ready for math test."
              name="name"
              onChange={handleInputChange}
              value={userFormData.name}
              required
              className="w-96 h-12 flex m-auto"
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
              placeholder="eg: Study modules 1 and 2."
              name="description"
              onChange={handleInputChange}
              value={userFormData.description}
              required
              className="w-96 h-32 flex m-auto"
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
              className="w-96 h-12 flex m-auto"
            />
            <Form.Control.Feedback type="invalid">
              Please give you goal a description!
            </Form.Control.Feedback>
          </Form.Group>

          <Button
            // disabled={!(userFormData.name && userFormData.description)}
            type="submit"
            variant="success"
            className="goals-submit flex m-auto"
          >
            Submit
          </Button>

          <div className="flex justify-center space-x-10 mt-20 mb-2">
            <Link to="/timer" className="goals-srt-achieve justify-center">
              Start Achieving!
            </Link>
          </div>
        </Form>

        <div>
          <h2>
            <strong className="flex justify-center">Your Goals</strong>
          </h2>
          {loading && <h2>Loading goals..</h2>}
          {!loading && userError && <h2>Something went wrong!</h2>}
          {goalsToday && goalsToday.length === 0 && (
            <h1>You haven't set any goal yet.</h1>
          )}
          {goalsToday &&
            goalsToday.length !== 0 &&
            goalsToday.map((goal) => {
              return (
                <div
                  className="card saved-goals w-2/5 flex m-auto"
                  key={goal._id}
                >
                  <li className="list-group-item">
                    <span>
                      <button
                        className="delete-goal-btn"
                        onClick={removeGoalHandler.bind(null, goal._id)}
                      >
                        ???????
                      </button>{" "}
                      {goal.name}{" "}
                    </span>
                    <span>{goal.duration}</span>
                  </li>
                </div>
              );
            })}
        </div>
      </div>
    </ProtectedRoute>
  );
}

export default Goals;
