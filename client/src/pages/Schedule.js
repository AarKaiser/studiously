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

const isSameDay = (firstDate, secondDate) => {
  const year1 = firstDate.getFullYear();
  const year2 = secondDate.getFullYear();

  const month1 = firstDate.getMonth();
  const month2 = secondDate.getMonth();

  const day1 = firstDate.getDate();
  const day2 = secondDate.getDate();

  const firstDateStr = `${year1}-${month1}-${day1}`;
  const secondDateStr = `${year2}-${month2}-${day2}`;

  return firstDateStr === secondDateStr;
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
    if (userData && userData.me) {
      const filtrdGoals = userData.me.savedGoals.filter((goal) => {
        const goalDate = new Date(goal.dateCreated);
        const selectedDate = date;

        return isSameDay(goalDate, selectedDate);
      });

      setFilteredGoals(filtrdGoals);
    }

    // console.log(date);
  }, [date]);

  return (
    <ProtectedRoute page={{ name: 'Schedule', url: 'schedule' }}>
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
                {filteredGoals.map((goal) => {
                  return <h2 key={goal._id}>{goal.name}</h2>;
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
