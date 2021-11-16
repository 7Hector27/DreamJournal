import React, { useState, useEffect } from 'react';
import {
  Container,
  InputGroup,
  FormControl,
  ListGroup,
  Button,
  Card,
  Dropdown,
  DropdownButton,
  Table,
} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Pagination from '../components/Pagination';
import axios from 'axios';
import SortIcon from '@mui/icons-material/Sort';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const FeedJournal = () => {
  const { id } = useParams();
  const [journal, setJournal] = useState({});
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState('');
  const [user, setUser] = useState({});

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

  const CommentSubmitHandler = async () => {
    axios.put(
      '/api/feed/journal/comment',
      { id: id, comment: comment },
      config
    );
    setComment('');
    const feedJournal = await axios.get(`/api/feed/journal/${id}`);
    setJournal(feedJournal.data);
  };

  const dropDownFilter = async (option) => {
    const res = await axios.get('/api/user/journal', config);
    if (option === 1) {
    }
    if (option === 2) {
      const favPosts = res.data.journal.reverse().map((fp) => fp);
    }
  };

  const deleteComment = (FJcomment) => {
    console.log(FJcomment._id);
    axios.delete(`/api/feed/comment/remove/${FJcomment._id}/${journal._id}`);
  };

  useEffect(async () => {
    fetchJournal();
    const user = await axios.get('/api/user/journal', config);
    setUser(user.data);
    console.log(journal);
  }, []);

  return (
    <>
      {!loading && (
        <Container
          style={{
            marginTop: '10px',
            padding: '5%',
            background:
              'linear-gradient(90deg, rgba(59,126,161,1) 0%, rgba(29,2,51,1) 100%)',
            paddingTop: '30px',
            paddingBottom: '10px',
          }}
        >
          <Card>
            <Card.Header>
              <Card.Title
                style={{
                  textDecoration: 'underline',
                  fontSize: '32px',
                }}
              >
                {journal.title}
              </Card.Title>
              <small>
                posted by {journal.publisherName} on{' '}
                {journal.createdAt.substring(0, 10)}
              </small>
            </Card.Header>
            <Card.Body>
              <Card.Title>{journal.description}</Card.Title>
            </Card.Body>
            <Card.Body>
              <Table striped bordered hover size='sm'>
                <tbody>
                  <tr>
                    <td style={{ fontWeight: 'bold' }}>Interpretation</td>
                    <td>{journal.interpretation}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 'bold' }}>Feeling</td>
                    <td>{journal.feeling}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 'bold' }}>Theme</td>
                    <td>{journal.theme}</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>

          <div style={{ marginTop: '10px' }}>
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
          </div>

          <div
            style={{
              background: 'white',
              marginTop: '10px',
              marginBottom: '30px',
            }}
          >
            <h3 style={{ marginBottom: '15px', marginLeft: '2.5%' }}>
              {journal.comments.length} Comments
              {/* <div style={{ float: 'right' }}>
                <DropdownButton id='dropdown-basic-button' title={<SortIcon />}>
                  <Dropdown.Item onClick={() => dropDownFilter(1)}>
                    Newest
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => dropDownFilter(2)}>
                    Oldest
                  </Dropdown.Item>
                </DropdownButton>
              </div> */}
            </h3>
            {!loading &&
              currentPosts.map((comment) => (
                <Card
                  style={{
                    marginTop: '5px',
                    width: '95%',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }}
                >
                  <Card.Header>
                    {comment.publisherName}{' '}
                    <small className='text-muted'>
                      {comment.date.substring(0, 10)}
                    </small>{' '}
                    {user._id == comment.publisherId && (
                      <DropdownButton
                        id='dropdown-basic-button'
                        style={{ float: 'right' }}
                        title={<MoreVertIcon />}
                      >
                        <Dropdown.Item onClick={() => deleteComment(comment)}>
                          Delete
                        </Dropdown.Item>
                      </DropdownButton>
                    )}
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
              style={{
                marginBottom: '10px',
                marginTop: '10px',
                paddingTop: '10px',
              }}
            />
          </div>
        </Container>
      )}
    </>
  );
};

export default FeedJournal;
