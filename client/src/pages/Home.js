import React, { useState, useEffect } from 'react';
import { Jumbotron, Container } from 'react-bootstrap';
import Auth from '../utils/auth';
import { saveGoalIds, getSavedGoalIds } from '../utils/localStorage';
import HomeButtons from '../components/HomeButtons';
import ProtectedRoute from '../components/ProtectedRoute';

const Home = () => {
  return (
    <ProtectedRoute>
      <Jumbotron className="bg-white" fluid>
        <Container>
          <img src="images/banner.jpg" alt="banner" className="banner"></img>
        </Container>
      </Jumbotron>

      <Container>
        <HomeButtons />
      </Container>
    </ProtectedRoute>
  );
};

export default Home;
