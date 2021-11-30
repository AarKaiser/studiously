import React, { useEffect, useState } from 'react';

const dummyTime = '1:20:3'.split(':').map((time) => +time);

function Countdown({ hours, minutes, seconds }) {
  return (
    <div className="flex justify-center space-x-10 font-bold">
      {/* {timerComponents.length ? timerComponents : <span>Time's up!</span>} */}
      <h3>Hours: {hours}</h3>
      <h3>Minutes: {minutes}</h3>
      <h3>Seconds: {seconds}</h3>
    </div>
  );
}

export default Countdown;
