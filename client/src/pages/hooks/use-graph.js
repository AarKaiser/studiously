import moment from 'moment';

import { QUERY_ME } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';

moment().format();

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};

const labels = ['Daily', 'Weekly', 'Monthly', 'All Time'];
const initialGoal = {
  labels,
  datasets: [
    {
      label: 'Avg completed goals',
      data: [0, 0, 0, 0],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
};

const initialTime = {
  labels,
  datasets: [
    {
      label: 'Avg timer per goal (in minutes)',
      data: [0, 0, 0, 0],
      borderColor: 'rgb(153, 102, 135)',
      backgroundColor: 'rgba(123, 112, 125, 0.5)',
    },
  ],
};

const initialCompleted = {
  labels,
  datasets: [
    {
      label: 'Avg goals daily',
      data: [0, 0, 0, 0],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

// YYYY-MM-DD
const constructDate = (dateObject, format) => {
  const year = dateObject.getFullYear();
  const month = dateObject.getMonth();
  const date = dateObject.getDate();

  if (format === 'DD-MM-YYYY') {
    return `${date}-${month + 1}-${year}`;
  }

  return `${year}-${month + 1}-${date}`;
};

// Get the earliest date from a list of dates
const getEliestDate = (dates) => {
  const constructedDate = dates.map((date) => constructDate(date));
  return constructedDate.reduce(function (previousDate, currentDate) {
    return moment(currentDate).isBefore(previousDate)
      ? currentDate
      : previousDate;
  });
};

const useGraph = () => {
  const { loading, error, data: queryData } = useQuery(QUERY_ME);

  // const [data, setData] = useState(initialData);
  const [data, setData] = useState({
    goal: initialGoal,
    time: initialTime,
    completed: initialCompleted,
  });

  const filterGoals = (goals, startingDate) => {
    return goals.filter((goal) => {
      const goalDate = constructDate(new Date(goal.dateCreated));
      return moment(goalDate).isSameOrAfter(constructDate(startingDate));
    });
  };

  // Calculate average goals
  const calculateAvgCompletedGoals = (goals) => {
    const completedGoalsLength = goals.filter(
      (goal) => goal.completed === true
    ).length;
    return Math.round(completedGoalsLength / goals.length);
  };

  // Calculate averge number of goals per day
  const calculateAvgGoalsPerDay = (goals, startingDate) => {
    const filteredGoals = filterGoals(goals, startingDate);
    const timeDifference = new Date().getTime() - startingDate.getTime();
    let daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));
    if (daysDifference === 0) {
      daysDifference = 1;
    }
    return Math.round(filteredGoals.length / daysDifference);
  };

  // Calculate average minute per goal
  const calculateAvgTimePerDay = (goals, startingDate) => {
    const filteredGoals = filterGoals(goals, startingDate);
    const timeDifference = new Date().getTime() - startingDate.getTime();
    let daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));
    if (daysDifference === 0) {
      daysDifference = 1;
    }

    const times = filteredGoals.map((goal) => goal.duration.split(':'));
    let newTimes = times.map((time) => {
      const hoursToMilliseconds = +time[0] * (1000 * 3600);
      const minutesToMilliseconds = +time[1] * (1000 * 60);
      const secondsToMilliseconds = +time[2] * 1000;
      return [
        hoursToMilliseconds,
        minutesToMilliseconds,
        secondsToMilliseconds,
      ];
    });

    const joinedTimes = newTimes.map((time) => {
      return time[0] + time[1] + time[2];
    });

    const timeInMilliseconds = joinedTimes.reduce((prevTime, currentTime) => {
      return prevTime + currentTime;
    });
    const timeInMinutes = timeInMilliseconds / (1000 * 60);

    return Math.round(timeInMinutes / daysDifference);
  };

  useEffect(() => {
    if (queryData && queryData.me) {
      const goals = queryData.me.savedGoals;
      const goalsDateList = goals.map((goal) => new Date(goal.dateCreated));

      // CALCULATE AVERAGE COMPLETED GOALS
      // avg daily completed goals
      const avgDailyCompletedGoals = calculateAvgCompletedGoals(
        filterGoals(goals, new Date())
      );
      // avg weekly completed goals
      const avgWeeklyCompletedGoals = calculateAvgCompletedGoals(
        filterGoals(goals, new Date(moment().day(-7)))
      );

      // avg monthly completed goals
      const avgMonthlyCompletedGoals = calculateAvgCompletedGoals(
        filterGoals(goals, new Date(moment().day(-31)))
      );

      // avg all time completed goals
      const avgAllTimeCompletedGoals = calculateAvgCompletedGoals(
        filterGoals(goals, new Date('1970-01-01'))
      );

      // Calculate average number of goals per day
      // day
      const avgDailyGoals = calculateAvgGoalsPerDay(goals, new Date());

      // week
      const avgWeeklyGoals = calculateAvgGoalsPerDay(
        goals,
        new Date(moment().day(-7))
      );

      // month
      const avgMonthlyGoals = calculateAvgGoalsPerDay(
        goals,
        new Date(moment().day(-31))
      );

      // alltime
      const avgAllTimeGoals = calculateAvgGoalsPerDay(
        goals,
        new Date(new Date(getEliestDate(goalsDateList)))
      );

      // Calculate average time spend per goal
      // day
      const avgDailyGoalsTime = calculateAvgTimePerDay(goals, new Date());

      // week
      const avgWeeklyGoalsTime = calculateAvgTimePerDay(
        goals,
        new Date(moment().day(-7))
      );

      // month
      const avgMonthlyGoalsTime = calculateAvgTimePerDay(
        goals,
        new Date(moment().day(-31))
      );

      // alltime
      const avgAllTimeGoalsTime = calculateAvgTimePerDay(
        goals,
        new Date(getEliestDate(goalsDateList))
      );

      const averageGoals = [
        avgDailyGoals,
        avgWeeklyGoals,
        avgMonthlyGoals,
        avgAllTimeGoals,
      ];

      const averageCompletedGoals = [
        avgDailyCompletedGoals,
        avgWeeklyCompletedGoals,
        avgMonthlyCompletedGoals,
        avgAllTimeCompletedGoals,
      ];

      const averageGoalsTime = [
        avgDailyGoalsTime,
        avgWeeklyGoalsTime,
        avgMonthlyGoalsTime,
        avgAllTimeGoalsTime,
      ];

      // console.log(averageCompletedGoals);
      // console.log(averageGoals);
      // console.log(averageGoalsTime);

      setData((prevState) => {
        const updatedState = { ...prevState };
        updatedState.goal.datasets[0].data = averageGoals;
        updatedState.time.datasets[0].data = averageGoalsTime;
        updatedState.completed.datasets[0].data = averageCompletedGoals;
        return updatedState;
      });
    }
  }, [queryData]);

  return { data, options };
};

export default useGraph;
