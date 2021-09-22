import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, Form, Accordion, Container } from 'react-bootstrap';
import UserJournals from './UserJournals';
import Pagination from './Pagination';
import axios from 'axios';
const Home = () => {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  //pagination attempt
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'x-auth-token': token,
        },
      };
      const res = await axios.get('/api/user/journal', config);
      setPosts(res.data.journal);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  // get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  //Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  console.log(posts);

  const journalSubmitionHandler = async () => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'x-auth-token': token,
      },
    };
    const response = await axios.get('/api/user/journal', config);
    const a = [
      ...response.data.journal,
      { title: title, description: description },
    ];

    await axios.put('/api/user/journal', { journal: a }, config);
  };

  return (
    <>
      <Container
        style={{
          background: '#EEEAF5',
          padding: '20px',
          marginTop: '50px',
        }}
      >
        <div style={{ marginTop: '0px' }}>
          <h2 style={{ float: 'right' }}>
            New Journal Entry <Button onClick={() => setShow(true)}>+</Button>
          </h2>
        </div>
        <div style={{ background: 'white', marginTop: '0px' }}>
          <h2>Search Bar </h2>
          <UserJournals posts={currentPosts} loading={loading} />
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={posts.length}
            paginate={paginate}
            style={{ marginBottom: '10px' }}
          />
        </div>
        <div style={{ background: 'white', marginTop: '50px' }}>
          <h2>past Entries </h2>
        </div>
      </Container>
      <div>
        <Modal
          show={show}
          onHide={() => setShow(false)}
          dialogClassName='modal-90w'
          backdrop='static'
          aria-labelledby='example-custom-modal-styling-title'
        >
          <Modal.Header closeButton>
            <Modal.Title id='example-custom-modal-styling-title'>
              Dream Journal Entry
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className='mb-3'
                controlId='exampleForm.ControlInput1'
              >
                <Form.Label>Title</Form.Label>
                <Form.Control
                  placeholder='Dream Title'
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>
              <Form.Group
                className='mb-3'
                controlId='exampleForm.ControlTextarea1'
              >
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as='textarea'
                  placeholder='Dream Description'
                  rows={3}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>
              <Button
                variant='dark'
                style={{ float: 'right' }}
                onClick={() => journalSubmitionHandler()}
              >
                Submit
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default Home;
