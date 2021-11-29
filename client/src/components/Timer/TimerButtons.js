import React from 'react';

export default function ReviewButtons({
  startCountDown,
  pauseCountDown,
  moveToNextGoal,
  resetGoalTimer,
  paused,
}) {
  return (
    <div className="flex justify-center space-x-10">
      <button
        className="bg-green-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded bottom-1 justify-start"
        onClick={!paused ? pauseCountDown : startCountDown}
      >
        {!paused ? 'Pause' : 'Resume'}
      </button>
      <button
        onClick={resetGoalTimer}
        className="content-end bg-green-600 blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded -bottom-1 justify-end"
        disabled
      >
        Restart
      </button>
      <button
        onClick={moveToNextGoal}
        className="content-end bg-green-600 blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded -bottom-1 justify-end"
        disabled
      >
        Next Goal
      </button>
    </div>
  );
}
