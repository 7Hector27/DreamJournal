import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Container,
  InputGroup,
  FormControl,
  Button,
  Tabs,
  Tab,
} from 'react-bootstrap';
import axios from 'axios';
import Home from '../layout/Home';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { userLogin } from '../actions/userActions';

function LandingPage() {
  const history = useHistory();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [email1, setEmail1] = useState('');
  const [password1, setPassword1] = useState('');
  const dispatch = useDispatch();
  const authenticated = useSelector((state) => state.user.data.authenticated);

  const SignUpHandler = async (name, email, password) => {
    await axios.post('/api/user/register', {
      name,
      email,
      password,
    });
  };

  const LogInHandler = () => {
    dispatch(userLogin(email1, password1));
  };

  return (
    <>
      {authenticated ? (
        history.push('/home')
      ) : (
        <Container>
          <Tabs
            defaultActiveKey='profile'
            id='uncontrolled-tab-example'
            className='mb-3'
          >
            <Tab eventKey='home' title='Sign Up'>
              <InputGroup size='sm' className='mb-3'>
                <InputGroup.Text id='inputGroup-sizing-sm'>
                  Name
                </InputGroup.Text>
                <FormControl
                  aria-label='Small'
                  onChange={(e) => setName(e.target.value)}
                />
              </InputGroup>
              <InputGroup size='sm' className='mb-3'>
                <InputGroup.Text id='inputGroup-sizing-sm'>
                  Email
                </InputGroup.Text>
                <FormControl
                  aria-label='Small'
                  onChange={(e) => setEmail(e.target.value)}
                />
              </InputGroup>
              <InputGroup size='sm' className='mb-3'>
                <InputGroup.Text id='inputGroup-sizing-sm'>
                  Password
                </InputGroup.Text>
                <FormControl
                  aria-label='Small'
                  onChange={(e) => setPassword(e.target.value)}
                />
              </InputGroup>
              <Button onClick={() => SignUpHandler(name, email, password)}>
                Sign Up
              </Button>
            </Tab>
            <Tab eventKey='profile' title='Sign In'>
              <InputGroup size='sm' className='mb-3'>
                <InputGroup.Text id='inputGroup-sizing-sm'>
                  Email
                </InputGroup.Text>
                <FormControl
                  aria-label='Small'
                  onChange={(e) => setEmail1(e.target.value)}
                />
              </InputGroup>
              <InputGroup size='sm' className='mb-3'>
                <InputGroup.Text id='inputGroup-sizing-sm'>
                  Password
                </InputGroup.Text>
                <FormControl
                  aria-label='Small'
                  onChange={(e) => setPassword1(e.target.value)}
                />
              </InputGroup>

              <Button onClick={(e) => LogInHandler(email1, password1)}>
                Sign In
              </Button>
            </Tab>
          </Tabs>
        </Container>
      )}
    </>
  );
}

export default LandingPage;
