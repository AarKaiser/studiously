import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../src/index.css";

function Cal(activeStartDate) {
  const [value, onChange] = useState(new Date());

  return (
    <div className="schedule-container">
      <div className="calendar-container">
        <Calendar
          onChange={onChange}
          value={value}
          // Testing different Props from https://www.npmjs.com/package/react-calendar
          // activeStartDate= {new Date(2021, 8, 1)}
          // calendarType=""
          // defaultView="year"
          onClickDay={(value, event) => alert("Clicked day: ", value)}
          // showDoubleView={true}
          // showNavigation={false}
          tileContent=""
        />
        <div className="calgoal-container">
          <h1>Goals Will Show Here</h1>
        </div>
      </div>
    </div>
  );
}

export default Cal;
