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

  return (
    <>
      {todaysGoal &&
        todaysGoal.map((goal) => {
          return (
            <Fragment key={goal._id}>
              <Container>
                <h2>{goal.name} ?</h2>
                {goal.completed !== true && goal.completed !== false && (
                  <>
                    <button
                      className="btn-complete"
                      onClick={props.setCompletedGoal.bind(
                        null,
                        goal._id,
                        'yes'
                      )}
                    >
                      Yes
                    </button>
                    <br />
                    <button
                      className="btn-complete"
                      onClick={props.setCompletedGoal.bind(
                        null,
                        goal._id,
                        'no'
                      )}
                    >
                      No
                    </button>{' '}
                  </>
                )}
                {goal.completed && (
                  <>
                    <h3 style={{ color: 'green' }}>Goal completed</h3>
                    <button
                      className="btn-complete"
                      onClick={props.setCompletedGoal.bind(
                        null,
                        goal._id,
                        'reset'
                      )}
                    >
                      Reset goal
                    </button>
                  </>
                )}
                {goal.completed === false && (
                  <>
                    <h3 style={{ color: 'red' }}>Unable to complete goal</h3>
                    <button
                      className="btn-complete"
                      onClick={props.setCompletedGoal.bind(
                        null,
                        goal._id,
                        'reset'
                      )}
                    >
                      Reset goal
                    </button>
                  </>
                )}
                {/* {iscompletedGoal(goal._id)}
                {isUncompletedGoal(goal._id)} */}
              </Container>
              <br />
            </Fragment>
          );
        })}
    </>
  );
}

export default Questions;
