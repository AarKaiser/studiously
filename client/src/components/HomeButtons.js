import React from 'react';
import { Link } from 'react-router-dom';

export default function HomeButtons() {
  return (
    <div className="flex justify-center space-x-10">
      <Link to="/goals" className="btn-create-goals animate-bounce">
        Create Goals
      </Link>
      <Link to="/schedule" className="btn-schedule">
        Your Schedule
      </Link>
    </div>
  );
}
