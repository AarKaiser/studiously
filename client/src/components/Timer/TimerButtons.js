import React from 'react';

export default function ReviewButtons({
  startCountDown,
  pauseCountDown,
  moveToNextGoal,
  resetGoalTimer,
  paused,
}) {
  return (
    <div className="flex justify-center space-x-10 timer-style ">
      <button
        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded bottom-1 justify-start"
        onClick={!paused ? pauseCountDown : startCountDown}
      >
        {!paused ? 'Pause' : 'Resume'}
      </button> 

    </div>
  );
}
