import moment from 'moment';

import { QUERY_ME } from '../utils/queries';
import { useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';

moment().format();

// YYYY-MM-DD
const constructDate = (dateObject) => {
  const year = dateObject.getFullYear();
  const month = dateObject.getMonth();
  const date = dateObject.getDate();

  return `${year}-${month + 1}-${date}`;
};

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

const useGraph = () => {
  const { loading, error, data: queryData } = useQuery(QUERY_ME);

  const data = {
    labels,
    datasets: [
      {
        label: 'Avg completed goals',
        data: [15, 24, 8, 19],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Avg goals daily',
        data: [25, 18, 7, 31],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Avg timer per goal',
        data: [5, 28, 17, 21],
        borderColor: 'rgb(153, 102, 135)',
        backgroundColor: 'rgba(123, 112, 125, 0.5)',
      },
    ],
  };

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

  useEffect(() => {
    if (queryData && queryData.me) {
      const goals = queryData.me.savedGoals;
      // calculate average completed goals
      // avg daily completed goals
      const avgdailyCompletedGoals = calculateAvgCompletedGoals(
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

      // avg monthly completed goals
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

      console.log(avgDailyGoals);
      console.log(avgWeeklyGoals);
      console.log(avgMonthlyGoals);
      // console.log(avgDailyGoals);
    }
  }, [queryData]);

  const [avgGoalCompletions, setAvgGoalCompletions] = useState({
    daily: '',
    weekly: '',
    monthly: '',
    allTime: '',
  });

  const [avgDailyGoals, setAvgDailyGoals] = useState({
    daily: '',
    weekly: '',
    monthly: '',
    allTime: '',
  });

  const [avgTimerPerGoal, setAvgTimerPerGoal] = useState({
    daily: '',
    weekly: '',
    monthly: '',
    allTime: '',
  });

  return { data, options };
};

export default useGraph;
