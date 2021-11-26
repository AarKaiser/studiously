import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';

import { getMe } from '../utils/API';
import Auth from '../utils/auth';
import Countdown from '../components/Timer/Countdown';
import TimerButtons from '../components/Timer/TimerButtons.js';


const Timer = () => {
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
    <>
        <Container>
          <h1>Timer</h1>
        </Container>
      <Container>
        <h2>After Goal 1, you get  a 15 mins break.</h2>
      </Container>

<Countdown />
<br />
<TimerButtons />

    </>
  );
};

export default Timer;