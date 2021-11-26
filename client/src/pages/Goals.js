import "./Goals.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap-icons/font/bootstrap-icons.css"
import { Form, Button, Alert } from 'react-bootstrap';

import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { SAVE_GOAL } from '../utils/mutations';
// import { REMOVE_GOAL } from '../utils/mutations';


function Goals(props) {
  // set initial form state
  const [userFormData, setUserFormData] = useState({ name: '', description: '' });
  const [saveGoal,{error}] = useMutation(SAVE_GOAL);
  const [showAlert,setShowAlert]=useState(false)

  useEffect(()=>{
    if(error){
      setShowAlert(true)
    }
    else{
      setShowAlert(false)
    }
  },[error])
  const handleFormSubmit = async (event) => {

    event.preventDefault();
    const mutationResponse = await saveGoal({
      variables: {
        name:userFormData.name,
        description: userFormData.description,
      },
    });

    const token = mutationResponse.data.saveGoal.token;
    Auth.login(token);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({
      ...userFormData,
      [name]: value,
    });
  };


  return (
    <>
      {/* This is needed for the validation functionality above */}
      <Form noValidate onSubmit={handleFormSubmit}>
        {/* show alert if server response is bad */}
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Error with goal!
        </Alert>

        <Form.Group>
          <Form.Label htmlFor='name'>Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='name'
            name='name'
            onChange={handleInputChange}
            value={userFormData.name}
            required
          />
          <Form.Control.Feedback type='invalid'>Please give you goal a name!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor='email'>Description</Form.Label>
          <Form.Control
            type='description'
            placeholder='Your goal description'
            name='description'
            onChange={handleInputChange}
            value={userFormData.description}
            required
          />
          <Form.Control.Feedback type='invalid'>Please give you goal a description!</Form.Control.Feedback>
        </Form.Group>

        <Button
          disabled={!(userFormData.name && userFormData.description )}
          type='submit'
          variant='success'>
          Submit
        </Button>
      </Form>

<container>
<h2>Your Goals</h2>


<div className="card saved-goals">
<li className="list-group-item">

<button className="delete-goal-btn" onClick=
{console.log("Delete Goal X Click")}>🗑️</button>{" "}Saved Goal 1{" "}


</li>
</div>

</container> 
    </>
  );
};

export default Goals;

