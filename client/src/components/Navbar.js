import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';
import SignUpForm from './SignupForm/SignupForm';
import LoginForm from './LoginForm/LoginForm';
import classes from './Navbar.module.css';

import Auth from '../utils/auth';
import AuthContext from '../store';

const AppNavbar = () => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);

  const authCtx = useContext(AuthContext);

  return (
    <>
      <Navbar className="navbar-style" variant="white" expand="lg">
        <Container fluid>
          <Navbar.Brand as={Link} to="/">
            <img src="images/StudyLogo.png" alt="logo" className="logo"></img>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar" />
          <Navbar.Collapse id="navbar">
            <Nav className="ml-auto">
              {/* if user is logged in show saved goals and logout */}
              {authCtx.isAuthenticated ? (
                <>
                 
                  <Nav.Link as={Link} to="/goals" className="nav-link">
                    Goals
                  </Nav.Link>
                  <Nav.Link as={Link} to="/schedule" className="nav-link">
                    Schedule
                  </Nav.Link>
                  <Nav.Link as={Link} to="/dailyreview" className="nav-link">
                    Daily Review
                  </Nav.Link>
                  <Nav.Link as={Link} to="/timer">
                    Timer
                  </Nav.Link>
                  <Nav.Link as={Link} to="/dashboard" className="nav-link">
                    Dashboard
                  </Nav.Link>
                  <Nav.Link onClick={authCtx.logout}>Logout</Nav.Link>
                </>
              ) : (
                <>
                  <Link to="/login" className={classes.btn}>
                    Login
                  </Link>
                  <Link to="/signup" className={classes.btn}>
                    Sign Up
                  </Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* set modal data up */}
      <Modal
        size="lg"
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby="signup-modal"
      >
        {/* tab container to do either signup or login component */}
        <Tab.Container defaultActiveKey="login">
          <Modal.Header closeButton>
            <Modal.Title id="signup-modal">
              <Nav variant="pills">
                <Nav.Item>
                  <Nav.Link eventKey="login">Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="signup">Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey="login">
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey="signup">
                <SignUpForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </>
  );
};

export default AppNavbar;
