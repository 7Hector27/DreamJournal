import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {} from '../actions/userActions';
import { Button } from 'react-bootstrap';
import axios from 'axios';
const Home = () => {
  const [name, setName] = useState('Name');
  const display = async () => {
    const token = localStorage.getItem('token');

    const config = {
      headers: {
        'x-auth-token': token,
      },
    };
    const response = await axios.get('/api/user', config);
    setName(response.data.name);
    console.log(response);
  };
  return (
    <>
      <Button onClick={() => display()}> Display User Id </Button>
      <h2>hello {name}</h2>
    </>
  );
};

export default Home;
