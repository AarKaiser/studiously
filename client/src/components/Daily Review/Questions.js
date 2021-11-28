import React, { Fragment, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';

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

function Questions(props) {
  const [completedIds, setCompletedIds] = useState([]);
  const [unCompletedIds, setUnCompletedIds] = useState([]);

  const [todaysGoal, setTodaysGoal] = useState();

  useEffect(() => {
    if (props.userData && props.userData.me) {
      const today = new Date();
      const filteredGoals = props.userData.me.savedGoals.filter((goal) => {
        return isSameDay(today, new Date(goal.dateCreated));
      });
      setTodaysGoal(filteredGoals);
    }
  }, [props]);

  const handleCompleted = (id) => {
    setCompletedIds((prevIds) => [...prevIds, id]);
  };

  const handlerUnCompleted = (id) => {
    setUnCompletedIds((prevIds) => [...prevIds, id]);
  };

  const iscompletedGoal = (goalId) => {
    const completed = completedIds.find((id) => id === goalId);
    if (completed) {
      return <h3 style={{ color: 'green' }}>Goal completed</h3>;
    }
  };

  const isUncompletedGoal = (goalId) => {
    const completed = unCompletedIds.find((id) => id === goalId);
    if (completed) {
      return <h3 style={{ color: 'red' }}>Unable to complete goal</h3>;
    }
  };

  const isDone = (goalId) => {
    const isCompleted = unCompletedIds.find((id) => id === goalId);
    const isNotCompleted = completedIds.find((id) => id === goalId);

    if (isCompleted || isNotCompleted) {
      return true;
    }
    return false;
  };

  return (
    <>
      {todaysGoal &&
        todaysGoal.map((goal) => {
          return (
            <Fragment key={goal._id}>
              <Container>
                <h2>{goal.name} ?</h2>
                {!isDone(goal._id) && (
                  <>
                    <button
                      className="btn-complete"
                      onClick={handleCompleted.bind(null, goal._id)}
                    >
                      Yes
                    </button>
                    <br />
                    <button
                      className="btn-complete"
                      onClick={handlerUnCompleted.bind(null, goal._id)}
                    >
                      No
                    </button>{' '}
                  </>
                )}
                {iscompletedGoal(goal._id)}
                {isUncompletedGoal(goal._id)}
              </Container>
              <br />
            </Fragment>
          );
        })}
    </>
  );
}

export default Questions;
