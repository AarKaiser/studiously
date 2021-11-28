import React from 'react';
import { Link } from 'react-router-dom';

export default function ReviewButtons() {
  return (
    <div>
      <Link
        to="/dashboard"
        className="bg-gray-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded bottom-1 justify-start"
      >
        View Goal Data
      </Link>
      <Link
        to="/goals"
        className="content-end bg-gray-600 blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded -bottom-1 justify-end"
      >
        Add More Goals
      </Link>
    </div>
  );
}
