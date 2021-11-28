import React from 'react';

export default function ReviewButtons({
  startCountDown,
  pauseCountDown,
  counting,
}) {
  return (
    <div className="flex justify-center space-x-10">
      <button
        className="bg-gray-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded bottom-1 justify-start"
        onClick={counting ? pauseCountDown : startCountDown}
      >
        {counting ? 'Pause' : 'Resume'}
      </button>
      <button className="content-end bg-gray-600 blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded -bottom-1 justify-end">
        Restart
      </button>
      <button className="content-end bg-gray-600 blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded -bottom-1 justify-end">
        Next Goal
      </button>
    </div>
  );
}
