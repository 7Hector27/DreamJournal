import React, { useState, useEffect } from 'react';
import {
  Container,
  InputGroup,
  FormControl,
  ListGroup,
  Button,
  Card,
} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Pagination from '../components/Pagination';
import axios from 'axios';
const FeedJournal = () => {
  const { id } = useParams();
  const [journal, setJournal] = useState({});
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState('');

  const token = localStorage.getItem('token');
  const config = {
    headers: {
      'x-auth-token': token,
    },
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(3);
  // pagination // get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = journal.comments?.slice(
    indexOfFirstPost,
    indexOfLastPost
  );
  //Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const fetchJournal = async () => {
    const feedJournal = await axios.get(`/api/feed/journal/${id}`);
    setJournal(feedJournal.data);
    setLoading(false);
    console.log(feedJournal.data);
  };

  const CommentSubmitHandler = () => {
    axios.put(
      '/api/feed/journal/comment',
      { id: id, comment: comment },
      config
    );
    setComment('');
  };

  useEffect(() => {
    fetchJournal();
    console.log(journal);
  }, []);

  return (
    <>
      {!loading && (
        <Container
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
              <h6>{journal?.createdAt.slice(0, 10)} </h6>
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
            ></ListGroup.Item>
            <InputGroup>
              <InputGroup.Text>Comment</InputGroup.Text>
              <FormControl
                as='textarea'
                aria-label='With textarea'
                placeholder='What are your thoughts?'
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <Button onClick={() => CommentSubmitHandler()}>Submit</Button>
            </InputGroup>
          </ListGroup>

          <div
            style={{
              background: 'white',
              marginTop: '30px',
              marginBottom: '30px',
            }}
          >
            <h3>{journal.comments.length} Comments </h3>
            {currentPosts.map((comment) => (
              <Card>
                <Card.Header>
                  {comment.publisherName}{' '}
                  <small className='text-muted'>
                    {comment.date.substring(0, 10)}
                  </small>
                </Card.Header>
                <Card.Body>
                  <Card.Text>{comment.comment}</Card.Text>
                </Card.Body>
              </Card>
            ))}
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={journal.comments.length}
              paginate={paginate}
              style={{ marginBottom: '10px' }}
            />
          </div>
        </Container>
      )}
    </>
  );
};

export default FeedJournal;
