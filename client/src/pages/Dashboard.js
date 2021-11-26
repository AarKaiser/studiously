import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
import Auth from '../utils/auth';
import { Doughnut, Pie, Line } from 'react-chartjs-2';
import "./Dashboard.css";


function Dashboard() {

  return (
    <div className="dashboard-container">
    <div className="charts-container">
      <h1>This Week</h1>
      <br />
      {/* <Doughnut
        
      /> */}
      <div className="prev-dash-container">
        <h1>Last Week</h1>
        <br />
        <hr></hr>
      </div>
    </div>
  </div>

  )}

  export default Dashboard;

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
//     return <h2>This is the dashboard. This is for goal data</h2>;
//   }

//   return (
//     <>
//       <Jumbotron fluid className='text-light bg-dark'>
//         <Container>
//           <h1>Dashboard</h1>
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
//                   <p className='small'>Authors: {goal.authors}</p>
//                   <Card.Text>{goal.description}</Card.Text>
//                   <Button className='btn-block btn-danger' onClick={() => handleDeleteGoal(goal.goalId)}>
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
