import React, { useEffect, useState } from 'react';

const dummyTime = '1:20:3'.split(':').map((time) => +time);

function Countdown() {
  const [initialTime, setInitialTime] = useState(dummyTime);
  const [timeData, setTimeData] = useState({
    hours: initialTime[0],
    minutes: initialTime[1],
    seconds: initialTime[2],
  });
  const [counting, setCounting] = useState(false);

  const countDown = () => {
    let now = new Date();
    let eventMS =
      new Date().getTime() +
      initialTime[0] * 60 * 60 * 1000 +
      initialTime[1] * 60 * 1000 +
      initialTime[2] * 1000;

    let currentTime = now.getTime();
    let eventTime = new Date(eventMS).getTime();
    let remainingTime = eventTime - currentTime;

    // Convert remaining time to hours, minutes and seconds
    let s = Math.floor(remainingTime / 1000);
    let m = Math.floor(s / 60);
    let h = Math.floor(m / 60);

    // Calculate remaining hours, minutes and seconds
    h %= 24;
    m %= 60;
    s %= 60;

    h = h < 10 ? '0' + h : h;
    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;

    setTimeData({ hours: h, minutes: m, seconds: s });
  };

  useEffect(() => {
    const timeInterval = setInterval(() => {
      countDown();
    }, [1000]);

    if (!counting) {
      clearInterval(timeInterval);
    }
  });

  const calculateTimeLeft = () => {
    let year = new Date().getFullYear();
    const difference = +new Date(`${year}-10-1`) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [year] = useState(new Date().getFullYear());

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span>
        {timeLeft[interval]} {interval}{' '}
      </span>
    );
  });
  return (
    <div>
      {timerComponents.length ? timerComponents : <span>Time's up!</span>}
      <h3>Hours: {timeData.hours}</h3>
      <h3>Minutes: {timeData.minutes}</h3>
      <h3>Seeconds: {timeData.seconds}</h3>
    </div>
  );
}

export default Countdown;
