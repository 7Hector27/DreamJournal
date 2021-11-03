import React, { useState, useEffect } from 'react';
import { Container, InputGroup, FormControl, ListGroup } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';
const FeedJournal = () => {
  const { id } = useParams();
  const [journal, setJournal] = useState({});
  const [loading, setLoading] = useState(true);
  const fetchJournal = async () => {
    const feedJournal = await axios.get(`/api/feed/journal/${id}`);
    setJournal(feedJournal.data);
    setLoading(false);
    console.log(feedJournal.data);
  };

  useEffect(() => {
    fetchJournal();
    console.log(journal);
  }, []);

  return (
    <>
      {!loading && <h1>{journal?.createdAt.substring(1, 10)}</h1>}
      {/* {journal?.createdAt.slice(1, 10)} */}
      {/* <Container
        style={{
          marginTop: '5%',
          background:
            'linear-gradient(90deg, rgba(50,85,139,1) 0%, rgba(135,114,173,1) 100%)',
          paddingTop: '10px',
          paddingBottom: '10px',
        }}
      >
        <ListGroup variant='flush'>
          <ListGroup.Item
            style={{
              backgroundColor: 'white',
              color: 'black',
              border: '1px solid black',
            }}
          >
            <h1
              style={{
                textDecoration: 'underline',
                fontSize: '40px',
              }}
            >
              {journal.title}
            </h1>
            <h6>{journal?.createdAt.slice(1, 10)} </h6>
          </ListGroup.Item>

          <ListGroup.Item
            style={{
              backgroundColor: 'white',
              color: 'black',
              border: '1px solid black',
            }}
          >
            <div>{journal.description}</div>
          </ListGroup.Item>
          <ListGroup.Item
            style={{
              backgroundColor: 'white',
              color: 'black',
              border: '1px solid black',
            }}
          >
            <div>{journal.interpretation}</div>
          </ListGroup.Item>
          <ListGroup.Item
            style={{
              backgroundColor: 'white',
              color: 'black',
              border: '1px solid black',
            }}
          >
            <div>{journal.feeling}</div>
          </ListGroup.Item>
          <ListGroup.Item
            style={{
              backgroundColor: 'white',
              color: 'black',
              border: '1px solid black',
            }}
          >
            <div>{journal.publisherName}</div>
          </ListGroup.Item>
          <ListGroup.Item
            style={{
              backgroundColor: 'white',
              color: 'black',
              border: '1px solid black',
            }}
          >
            <div>{journal.theme}</div>
          </ListGroup.Item>
          <ListGroup.Item
            style={{
              backgroundColor: 'white',
              color: 'black',
              border: '1px solid black',
            }}
          >
            <div>{journal.comments}</div>
          </ListGroup.Item>
        </ListGroup>
        <InputGroup>
          <InputGroup.Text>Comment</InputGroup.Text>
          <FormControl
            as='textarea'
            aria-label='With textarea'
            placeholder='What are your thoughts?'
          />
        </InputGroup>
        <h2
          style={{
            background: 'green',
            marginTop: '30px',
            marginBottom: '30px',
          }}
        >
          comments
        </h2>
      </Container> */}
    </>
  );
};

export default FeedJournal;
