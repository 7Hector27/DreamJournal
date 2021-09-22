import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { userLogOut } from '../actions/userActions';
const NavbarComponent = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const signOutHandler = () => {
    dispatch(userLogOut());
    localStorage.setItem('token', '');
    history.push('/landingPage');
  };

  return (
    <Navbar bg='dark' variant='dark'>
      <Container>
        <LinkContainer to={'/'}>
          <Navbar.Brand>Dream Journal</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ml-auto'>
            <LinkContainer to={`/`}>
              <Nav.Link>landingPage</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>

      <Nav className='ml-auto'>
        {' '}
        <Container>
          <Nav.Link onClick={signOutHandler}>Log Out</Nav.Link>
        </Container>
      </Nav>
    </Navbar>
  );
};

export default NavbarComponent;
