import React from 'react';
import {
  Navbar,
  Nav,
  Container,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
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
        background:
          'linear-gradient(90deg, rgba(59,126,161,1) 0%, rgba(29,2,51,1) 100%)',
        fontFamily: 'IBM Plex Serif, serif',
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
            <LinkContainer
              to={`/home`}
              style={{ color: 'white', fontSize: '22px' }}
            >
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer
              to={`/Feed`}
              style={{ color: 'white', fontSize: '22px' }}
            >
              <Nav.Link>Feed</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>

      <Nav className='ml-auto'>
        {' '}
        <Container>
          <OverlayTrigger
            placement='left'
            delay={{ show: 250, hide: 400 }}
            overlay={<Tooltip>Sign Out</Tooltip>}
          >
            <Nav.Link onClick={signOutHandler} style={{ color: 'white' }}>
              <LogoutIcon style={{ fontSize: '32px' }} />
            </Nav.Link>
          </OverlayTrigger>
        </Container>
      </Nav>
    </Navbar>
  );
};

export default NavbarComponent;
