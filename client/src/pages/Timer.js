import React, { useState, useEffect, useRef } from 'react';
import { Container } from 'react-bootstrap';

import { getMe } from '../utils/API';
import Auth from '../utils/auth';
import Countdown from '../components/Timer/Countdown';
import TimerButtons from '../components/Timer/TimerButtons.js';
import ProtectedRoute from '../components/ProtectedRoute';
import { QUERY_ME } from '../utils/queries';
import { useQuery } from '@apollo/client';
import { Redirect } from 'react-router-dom';
import isSameDay from '../utils/is-same-day';

const dateMilliSeconds = (formTimeData) => {
  const timeData = formTimeData.split(':').map((time) => +time);

  let milliSeconds =
    new Date().getTime() +
    timeData[0] * 60 * 60 * 1000 +
    timeData[1] * 60 * 1000 +
    timeData[2] * 1000;

  return milliSeconds;
};

const Timer = () => {
  const [goals, setGoals] = useState(null);
  const [durations, setDurations] = useState([]);

  const { loading, error, data } = useQuery(QUERY_ME);

  // Times
  const [timerHours, setTimerHours] = useState('00');
  const [timerMinutes, setTimerMinutes] = useState('00');
  const [timerSeconds, setTimerSeconds] = useState('00');

  const [paused, setPaused] = useState(false);
  const [pausedTimerData, setPausedTimerData] = useState(null);
  let interval = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);

  const [allCompleted, setAllCompleted] = useState(false);
  // const [dummyTime, setDummyTime] = useState(['00:00:15', '00:00:30']);

  // Set users goals
  useEffect(() => {
    if (data && data.me) {
      const today = new Date();
      const filterdGoals = data.me.savedGoals.filter((goal) => {
        return isSameDay(today, new Date(goal.dateCreated));
      });
      const dtn = filterdGoals.map((goal) => goal.duration);
      setDurations(dtn);
      setGoals(filterdGoals);
    }
  }, [data]);

  const startTimer = () => {
    clearInterval(interval);

    const countDownDate = new Date(
      dateMilliSeconds(
        pausedTimerData ? pausedTimerData : durations[currentIndex]
      )
    ).getTime();

    interval.current = setInterval(() => {
      const now = new Date().getTime();
      const distance = countDownDate - now;

      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        // stop the timer and on move to the next goal if any
        clearInterval(interval.current);
        if (durations[currentIndex + 1]) {
          setCurrentIndex((prevIndex) => prevIndex + 1);
        } else {
          setAllCompleted(true);
        }
      } else {
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      }
    }, 1000);
  };

  // start counter
  const startCountDown = () => {
    const pausedTime = pausedTimerData.split(':').map((time) => +time);
    // set paused times
    setTimerHours(pausedTime[0]);
    setTimerMinutes(pausedTime[1]);
    setTimerSeconds(pausedTime[2]);

    setPausedTimerData(null);
    setPaused(false);
    startTimer();
  };

  // pause counter
  const pauseCountDown = () => {
    console.log(`${timerHours}:${timerMinutes}:${timerSeconds}`);
    clearInterval(interval.current);
    setPausedTimerData(`${timerHours}:${timerMinutes}:${timerSeconds}`);
    setPaused(true);
  };

  // Move to next goal
  const moveToNextGoal = () => {
    clearInterval(interval);
    if (durations[currentIndex + 1]) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  // Reset goal
  const resetGoalTimer = () => {
    clearInterval(interval);
    startTimer();
  };

  useEffect(() => {
    if (durations.length !== 0) {
      startTimer();
    }
    return () => {
      clearInterval(interval);
    };
  }, [currentIndex, durations]);

  if (allCompleted) {
    return <Redirect to="/dailyreview" />;
  }

  return (
    <ProtectedRoute page={{ name: 'Timer', url: 'timer' }}>
      <Container>
        <h1>Timer</h1>
      </Container>
      <Container>
        <h2 style={{ margin: '1rem' }}>
          <span style={{ fontWeight: 'bold' }}>
            {goals && goals[currentIndex].name}
          </span>
          , you get a 15 mins break.
        </h2>
      </Container>

      <Countdown
        hours={timerHours}
        minutes={timerMinutes}
        seconds={timerSeconds}
      />
      <br />
      <TimerButtons
        startCountDown={startCountDown}
        pauseCountDown={pauseCountDown}
        moveToNextGoal={moveToNextGoal}
        resetGoalTimer={resetGoalTimer}
        paused={paused}
      />
    </ProtectedRoute>
  );
};

export default Timer;
