import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { userLogOut } from '../actions/userActions';
import LogoutIcon from '@mui/icons-material/Logout';
import NightsStayIcon from '@mui/icons-material/NightsStay';
const NavbarComponent = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const signOutHandler = () => {
    dispatch(userLogOut());
    localStorage.setItem('token', '');
    history.push('/');
  };

  return (
    <Navbar
      style={{
        backgroundColor: '#021C33',
      }}
    >
      <Container>
        <Navbar.Brand style={{ color: 'white', alignItems: 'flexStart' }}>
          Dream Journal
          <NightsStayIcon />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ml-auto'>
            <LinkContainer to={`/home`} style={{ color: 'white' }}>
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to={`/Feed`} style={{ color: 'white' }}>
              <Nav.Link>Feed</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>

      <Nav className='ml-auto'>
        {' '}
        <Container>
          <Nav.Link onClick={signOutHandler} style={{ color: 'white' }}>
            <LogoutIcon />
          </Nav.Link>
        </Container>
      </Nav>
    </Navbar>
  );
};

export default NavbarComponent;
