import "./Goals.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap-icons/font/bootstrap-icons.css"
import {Doughnut} from 'react-chartjs-2'

function Goals() {

  return (

    <div className="goals-container">
      <nav className="navbar">
      <div className="navbar-brand">📝 Current Goals </div>
      <div className="icons">
        <button className="save-icon" onClick={console.log("Save Clicked")}>💾</button>
        <button className="new-goal-icon" onClick={console.log("New Goal Clicked")}>➕</button>
      </div>
    </nav>
      <div className="container-fluid goals-input">
      <div className="row">
        <div className="col-4 list-container">
          <div className="card saved-goals">
            <ul className="list-group"></ul>
            <li className="list-group-item"><button className="delete-goal-btn" onClick={console.log("Delete Goal X Click")}>🗑️</button> Saved Goal 1 </li>
          </div>
        </div>
        <div className="col-8 goal-input">
          <input
            className="goal-title"
            placeholder="Goal Title"
            maxlength="28"
            type="text"
          />
          <textarea className="goal-textarea" placeholder="Goal Description"></textarea>
        </div>
      </div>
    </div>
    </div>

  );
}

export default Goals;





// import React, { useState, useEffect } from 'react';
// import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';

// import { getMe, deleteGoal } from '../utils/API';
// import Auth from '../utils/auth';
// import { removeGoalId } from '../utils/localStorage';

// const SavedGoals = () => {
//   const [userData, setUserData] = useState({});

//   // use this to determine if `useEffect()` hook needs to run again
//   const userDataLength = Object.keys(userData).length;

//   useEffect(() => {
//     const getUserData = async () => {
//       try {
//         const token = Auth.loggedIn() ? Auth.getToken() : null;

//         if (!token) {
//           return false;
//         }

//         const response = await getMe(token);

//         if (!response.ok) {
//           throw new Error('something went wrong!');
//         }

//         const user = await response.json();
//         setUserData(user);
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     getUserData();
//   }, [userDataLength]);

//   // create function that accepts the goal's mongo _id value as param and deletes the goal from the database
//   const handleDeleteGoal = async (goalId) => {
//     const token = Auth.loggedIn() ? Auth.getToken() : null;

//     if (!token) {
//       return false;
//     }

//     try {
//       const response = await deleteGoal(goalId, token);

//       if (!response.ok) {
//         throw new Error('something went wrong!');
//       }

//       const updatedUser = await response.json();
//       setUserData(updatedUser);
//       // upon success, remove goal's id from localStorage
//       removeGoalId(goalId);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // if data isn't here yet, say so
//   if (!userDataLength) {
//     return <h2>LOADING...</h2>;
//   }

//   return (
//     <>
//       <Jumbotron fluid classNameName='text-light bg-dark'>
//         <Container>
//           <h1>Viewing saved goals!</h1>
//         </Container>
//       </Jumbotron>
//       <Container>
//         <h2>
//           {userData.savedGoals.length
//             ? `Viewing ${userData.savedGoals.length} saved ${userData.savedGoals.length === 1 ? 'goal' : 'goals'}:`
//             : 'You have no saved goals!'}
//         </h2>
//         <CardColumns>
//           {userData.savedGoals.map((goal) => {
//             return (
//               <Card key={goal.goalId} border='dark'>
//                 {goal.image ? <Card.Img src={goal.image} alt={`The cover for ${goal.title}`} variant='top' /> : null}
//                 <Card.Body>
//                   <Card.Title>{goal.title}</Card.Title>
//                   <p classNameName='small'>Authors: {goal.authors}</p>
//                   <Card.Text>{goal.description}</Card.Text>
//                   <Button classNameName='btn-block btn-danger' onClick={() => handleDeleteGoal(goal.goalId)}>
//                     Delete this Goal!
//                   </Button>
//                 </Card.Body>
//               </Card>
//             );
//           })}
//         </CardColumns>
//       </Container>
//     </>
//   );
// };

// export default SavedGoals;
