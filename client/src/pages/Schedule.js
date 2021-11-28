import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import './Schedule.css';
import '../../src/index.css';
import ProtectedRoute from '../components/ProtectedRoute';
import { QUERY_ME } from '../utils/queries';
import { useQuery } from '@apollo/client';

const dataMilliSeconds = (formTimeData) => {
  const timeData = formTimeData.split(':').map((time) => +time);

  let milliSeconds =
    new Date().getTime() +
    timeData[0] * 60 * 60 * 1000 +
    timeData[1] * 60 * 1000 +
    timeData[2] * 1000;

  return milliSeconds;
};

function Cal(activeStartDate) {
  const { error, loading, data, refetch } = useQuery(QUERY_ME);

  const [date, setDate] = useState(new Date());
  const [userData, setUserData] = useState(data);

  // filtered goals
  const [filteredGoals, setFilteredGoals] = useState([]);

  const dateChangeHandler = (value, event) => {
    setDate(value);
  };

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    // Set filtered date
    // const

    console.log(date);
  }, [date]);

  return (
    <ProtectedRoute>
      <div className="schedule-container">
        <div className="calendar-container">
          <h1>Your Schedule</h1>
          <br />
          <Calendar
            // onChange={onChange}
            value={date}
            // Testing different Props from https://www.npmjs.com/package/react-calendar
            // activeStartDate= {new Date(2021, 8, 1)}
            // calendarType=""
            // defaultView="year"
            onClickDay={dateChangeHandler}
            // showDoubleView={true}
            // showNavigation={false}
            tileContent=""
          />
          <div className="calgoal-container">
            <h1>Today's Goals</h1>
            <br />
            <hr></hr>
            {loading && <h2>Loading saved goals...</h2>}
            {!loading && userData && userData.me && (
              <ul>
                {userData.me.savedGoals.map((goal) => {
                  return <h2>{goal.name}</h2>;
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

export default Cal;
