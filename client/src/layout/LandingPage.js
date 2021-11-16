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
  Alert,
} from 'react-bootstrap';
import axios from 'axios';
import Home from '../layout/Home';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { userLogin } from '../actions/userActions';

function LandingPage() {
  document.body.style.background =
    'linear-gradient(90deg, rgba(59,126,161,1) 0%, rgba(29,2,51,1) 100%)';

  const history = useHistory();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email1, setEmail1] = useState('');
  const [password1, setPassword1] = useState('');
  const [popup, setPopup] = useState(false);
  const [text, setText] = useState('');
  const [variant, setVariant] = useState('');
  const [show, setShow] = useState(true);

  const dispatch = useDispatch();
  const authenticated = useSelector((state) => state.user.data.authenticated);
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      'x-auth-token': token,
    },
  };
  const SignUpHandler = async (name, email, password, confirmPassword) => {
    if (name === '' || email === '' || password === '') {
      setShow(false);
      setPopup(true);
      setVariant('danger');

      setText('Please Fill In All Input Fields');
      setTimeout(function () {
        setPopup(false);
        setText('');
        setVariant('');
      }, 3000);
    } else if (password !== confirmPassword) {
      setShow(false);
      setPopup(true);
      setVariant('danger');

      setText('Passwords Must Match');
      setTimeout(function () {
        setPopup(false);
        setText('');
        setVariant('');
      }, 3000);
    } else {
      await axios.post('/api/user/register', {
        name,
        email,
        password,
      });

      setShow(false);
      setPopup(true);
      setVariant('success');

      setText('Registration Succesful');
      setTimeout(function () {
        setPopup(false);
        setText('');
        setVariant('');
      }, 3000);
    }
  };

  const LogInHandler = () => {
    if (email1 === '' || password1 === '') {
      setShow(false);
      setPopup(true);
      setVariant('danger');

      setText('Please Fill In All Input Fields');
      setTimeout(function () {
        setPopup(false);
        setText('');
        setVariant('');
      }, 3000);
    } else {
      dispatch(userLogin(email1, password1));
    }
  };

  return (
    <>
      {popup && <Alert variant={variant}>{text}</Alert>}
      {authenticated ? (
        history.push('/home')
      ) : (
        <>
          <h1 style={{ textAlign: 'center', marginTop: '2%', color: 'white' }}>
            Dream Journal
          </h1>
          <Container
            style={{
              marginTop: '5%',
              width: '500px',
              padding: '15px',
              background: '#D7E4EE',
              borderRadius: '25px',
            }}
          >
            <Tabs
              defaultActiveKey='profile'
              id='uncontrolled-tab-example'
              className='mb-3'
            >
              <Tab eventKey='home' title='Sign Up'>
                <InputGroup size='sm' className='mb-3'>
                  <InputGroup.Text id='inputGroup-sizing-sm'>
                    Full Name
                  </InputGroup.Text>
                  <FormControl
                    aria-label='Small'
                    onChange={(e) => setName(e.target.value)}
                  />
                </InputGroup>
                <InputGroup size='sm' className='mb-3'>
                  <InputGroup.Text id='inputGroup-sizing-sm'>
                    Email Adress
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
                    type='password'
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </InputGroup>
                <InputGroup size='sm' className='mb-3'>
                  <InputGroup.Text id='inputGroup-sizing-sm'>
                    Confirm Password
                  </InputGroup.Text>
                  <FormControl
                    aria-label='Small'
                    type='password'
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </InputGroup>
                <Button
                  onClick={() =>
                    SignUpHandler(name, email, password, confirmPassword)
                  }
                  style={{ marginLeft: '80%', BackgroundColor: '#1d0233' }}
                >
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
                    type='password'
                    aria-label='Small'
                    onChange={(e) => setPassword1(e.target.value)}
                  />
                </InputGroup>

                <Button
                  onClick={(e) => LogInHandler(email1, password1)}
                  style={{ marginLeft: '80%' }}
                >
                  Sign In
                </Button>
              </Tab>
            </Tabs>
          </Container>
        </>
      )}
    </>
  );
}

export default LandingPage;
