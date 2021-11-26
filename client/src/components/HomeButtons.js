import React from "react";

export default function HomeButtons() {
  return (
    <div className="flex justify-center space-x-10">
      <a href="/goals" className="btn-create-goals">
        Create Goals
      </a>
      <a href="/schedule" className="btn-schedule">
        Your Schedule
      </a>
    </div>
  );
}
