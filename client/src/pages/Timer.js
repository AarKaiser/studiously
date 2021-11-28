import React, { useState, useEffect, useRef } from 'react';
import { Container } from 'react-bootstrap';

import { getMe } from '../utils/API';
import Auth from '../utils/auth';
import Countdown from '../components/Timer/Countdown';
import TimerButtons from '../components/Timer/TimerButtons.js';
import ProtectedRoute from '../components/ProtectedRoute';

const dataMilliSeconds = (formTimeData) => {
  const timeData = formTimeData.split(':').map((time) => +time);

  let milliSeconds =
    new Date().getTime() +
    timeData[0] * 60 * 60 * 1000 +
    timeData[1] * 60 * 1000 +
    timeData[2] * 1000;

  return milliSeconds;
};

const Timer = () => {
  const [userData, setUserData] = useState({});

  // Times
  const [timerHours, setTimerHours] = useState('00');
  const [timerMinutes, setTimerMinutes] = useState('00');
  const [timerSeconds, setTimerSeconds] = useState('00');

  const [counting, setCounting] = useState(true);
  const [pausedTimerData, setPausedTimerData] = useState(null);

  // start counter
  const startCountDown = () => {
    setPausedTimerData(null);
    setCounting(true);
  };

  // pause counter
  const pauseCountDown = () => {
    setPausedTimerData(`${timerHours}:${timerMinutes}:${timerSeconds}`);
    setCounting(false);
  };

  let interval = useRef();

  const startTimer = () => {
    const countDownDate = new Date(
      dataMilliSeconds(pausedTimerData ? pausedTimerData : '1:00:40')
    ).getTime();

    interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countDownDate - now;

      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        // stop the timer or move to the next goal
        clearInterval(interval.current);
      } else {
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      }
    }, 1000);
  };

  useEffect(() => {
    if (counting) {
      startTimer();
    }

    return () => {
      clearInterval(interval);
    };
  }, [counting]);

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
      <Container>
        <h1>Timer</h1>
      </Container>
      <Container>
        <h2>After Goal 1, you get a 15 mins break.</h2>
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
        counting={counting}
      />
    </ProtectedRoute>
  );
};

export default Timer;
