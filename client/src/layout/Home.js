import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Modal,
  Form,
  Accordion,
  Container,
  Alert,
  FormControl,
  InputGroup,
  Row,
  Col,
  FloatingLabel,
  DropdownButton,
  Dropdown,
} from 'react-bootstrap';
import Pagination from './Pagination';
import axios from 'axios';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import SortIcon from '@mui/icons-material/Sort';
import Switch from '@mui/material/Switch';

const Home = () => {
  document.body.style.background = '#fffbef';
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editPost, setEditPost] = useState({});
  const [journalEntry, setJournalEntry] = useState({
    title: '',
    description: '',
    theme: '',
    characters: '',
    location: '',
    feeling: '',
    interpretation: '',
    favorite: false,
    public: false,
  });
  const [search, setSearch] = useState('');
  //pagination attempt
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);
  const [popup, setPopup] = useState(false);
  const [text, setText] = useState('');
  const [variant, setVariant] = useState('');
  const [check, setCheck] = useState(false);
  //Switch Modal
  const [checkSwitch, setCheckSwitch] = useState(false);
  const [showPublish, setShowPublish] = useState(false);
  const [publishModal, setPublishModal] = useState({
    publishTitle: '',
    publishDescription: '',
    buttonText: '',
  });
  const alert1 = () => {
    alert('hi');
  };
  const alert2 = () => {
    alert('bye');
  };
  const [modalFunc, setModalFunc] = useState(() => () => alert1);

  const token = localStorage.getItem('token');
  const config = {
    headers: {
      'x-auth-token': token,
    },
  };
  const fetchPosts = async () => {
    setLoading(true);
    const res = await axios.get('/api/user/journal', config);
    setPosts(res.data.journal);
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
    console.log('hi');
  }, []);
  // get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts?.slice(indexOfFirstPost, indexOfLastPost);

  //Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const journalSubmitionHandler = async () => {
    const response = await axios.get('/api/user/journal', config);
    const a = [...response.data.journal, journalEntry];

    await axios.put('/api/user/journal', { journal: a }, config);
    setShow(false);
    setPopup(true);
    setVariant('success');
    setText('Journal Added');
    fetchPosts();
    setTimeout(function () {
      setPopup(false);
      setText('');
      setVariant('');
    }, 3000);
    console.log(journalEntry);
  };
  const updateJournal = async (editPost) => {
    const response = await axios.get('/api/user/journal', config);
    const edittedJournals = response.data.journal.map((n) => {
      return n._id === editPost._id ? { ...editPost } : n;
    });
    await axios.put('/api/user/journal', { journal: edittedJournals }, config);
    setShowEdit(false);
    fetchPosts();
    setVariant('success');
    setText('Journal Updated');
    setPopup(true);
    setTimeout(function () {
      setPopup(false);
      setText('');
      setVariant('');
    }, 3000);
  };

  const deleteDream = async (id) => {
    await axios.delete(`/api/user/journal/${id}`, config);
    setPopup(true);
    setVariant('danger');

    setText('Journal Deleted');
    fetchPosts();
    setTimeout(function () {
      setPopup(false);
      setText('');
      setVariant('');
    }, 3000);
  };

  const searchHandler = async (e) => {
    e.preventDefault();

    if (search === '') {
      alert('please type something into search bar');
    } else {
      const res = await axios.get('/api/user/journal', config);

      const filteredPosts = res.data.journal.filter((post) => {
        const regex = new RegExp(`^${search}`, 'gi');
        return (
          post.title.match(regex) ||
          post.description.match(regex) ||
          post.theme.match(regex) ||
          post.characters.match(regex)
        );
      });
      console.log(filteredPosts);
      setPosts(filteredPosts);
    }
  };

  const dropDownFilter = async (option) => {
    const res = await axios.get('/api/user/journal', config);
    if (option === 1) {
      const favPosts = res.data.journal.filter(
        (product) => product.favorite === true
      );
      setPosts(favPosts);
    }
    if (option === 2) {
      const favPosts = res.data.journal.reverse().map((fp) => fp);

      setPosts(favPosts);
    }
  };

  const publishHandler = (journal) => {
    if (checkSwitch) {
      setPublishModal({
        ...publishModal,
        publishTitle: 'Publish Journal',
        publishDescription:
          'Are you sure you want to Add Journal to the Public Feed',
        buttonText: 'Add',
      });
      setModalFunc(() => alert2);
    } else {
      setPublishModal({
        ...publishModal,
        publishTitle: 'Remove Publication',
        publishDescription:
          'Are you sure you want to Remove Journal from the Public Feed',
        buttonText: 'Remove',
      });
      setModalFunc(() => alert1);
    }
    setShowPublish(true);
  };
  return (
    <>
      <div stlye={{ marginBottom: '10px' }}>
        {popup && <Alert variant={variant}>{text}</Alert>}
      </div>

      <Container
        style={{
          background:
            ' linear-gradient(90deg, rgba(50,85,139,1) 0%, rgba(135,114,173,1) 100%)',
          padding: '20px',
          marginTop: '50px',
          borderRadius: '3%',
        }}
      >
        <div>
          <div style={{ display: 'flex', float: 'right' }}>
            <Form onSubmit={(e) => searchHandler(e)}>
              <FormControl
                style={{
                  width: '20em',
                  borderRadius: '20px',
                  marginRight: '5px',
                }}
                className='searchBar'
                type='text'
                placeholder='search...'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Form>
            <Button
              onClick={() => setShow(true)}
              style={{ marginRight: '5px' }}
            >
              +
            </Button>
            <div style={{ float: 'right' }}>
              <DropdownButton id='dropdown-basic-button' title={<SortIcon />}>
                <Dropdown.Item onClick={() => dropDownFilter(1)}>
                  Favorites
                </Dropdown.Item>
                <Dropdown.Item onClick={() => dropDownFilter(2)}>
                  Oldest
                </Dropdown.Item>
                <Dropdown.Item onClick={() => fetchPosts()}>
                  Newest
                </Dropdown.Item>
              </DropdownButton>
            </div>
          </div>
        </div>
        <div
          style={{
            background: 'white',
            marginTop: '50px',
            padding: '10px',
          }}
        >
          <h2>Past Entries</h2>

          {loading ? (
            <h2>Loading Journals...</h2>
          ) : (
            currentPosts?.map((post) => (
              <Accordion>
                <Accordion.Item
                  eventKey='1'
                  style={{
                    margin: '8px',
                  }}
                >
                  <Accordion.Header>
                    <Row>
                      {post.title}
                      <Col>{post.favorite && <StarIcon />}</Col>
                    </Row>
                  </Accordion.Header>
                  <Accordion.Body
                    style={{
                      marginBottom: '30px',
                      color: '#573092',
                    }}
                  >
                    <FormControlLabel
                      control={
                        <Switch
                          checked={post.public}
                          onClick={() => publishHandler(post)}
                        />
                      }
                      label='Published'
                      style={{
                        float: 'right',
                        display: 'block',
                      }}
                    />
                    <h6 style={{ color: 'black' }}>Description:</h6>
                    <div>{post.description}</div>

                    <h6 style={{ marginTop: '10px', color: 'black' }}>
                      Theme:{' '}
                    </h6>
                    {post.theme}

                    <h6 style={{ marginTop: '10px', color: 'black' }}>
                      Characters:{' '}
                    </h6>
                    {post.characters}

                    <h6 style={{ marginTop: '10px', color: 'black' }}>
                      Location:{' '}
                    </h6>
                    {post.location}

                    <h6 style={{ marginTop: '10px', color: 'black' }}>
                      How i felt during my dream:{' '}
                    </h6>
                    {post.feeling}

                    <h6 style={{ marginTop: '10px', color: 'black' }}>
                      Interpretation:{' '}
                    </h6>
                    {post.interpretation}

                    <div
                      style={{
                        float: 'right',
                        marginTop: '20px',
                        paddingTop: '5px',
                      }}
                    >
                      <Button
                        onClick={() => {
                          setShowEdit(true);
                          setEditPost(post);
                        }}
                        style={{ marginRight: '5px' }}
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => deleteDream(post._id)}
                        variant='danger'
                      >
                        Delete
                      </Button>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            ))
          )}
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={posts?.length}
            paginate={paginate}
            style={{ marginBottom: '10px' }}
          />
        </div>
      </Container>

      <div>
        <Modal
          show={show}
          onHide={() => setShow(false)}
          dialogClassName='modal-90w'
          backdrop='static'
          aria-labelledby='example-custom-modal-styling-title'
          style={{
            background:
              ' linear-gradient(90deg, rgba(50,85,139,1) 0%, rgba(135,114,173,1) 100%)',
          }}
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
                <FormControlLabel
                  style={{ float: 'right' }}
                  control={
                    <Checkbox
                      checked={check}
                      icon={<StarBorderIcon />}
                      checkedIcon={<StarIcon />}
                      name='checkedH'
                      onChange={(e) => {
                        setCheck(e.target.checked);
                        setJournalEntry({
                          ...journalEntry,
                          favorite: e.target.checked,
                        });
                      }}
                    />
                  }
                  label='Favorite'
                />
                <Form.Label>Title</Form.Label>

                <Form.Control
                  placeholder='Dream Title'
                  onChange={(e) =>
                    setJournalEntry({ ...journalEntry, title: e.target.value })
                  }
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
                  onChange={(e) =>
                    setJournalEntry({
                      ...journalEntry,
                      description: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <InputGroup className='mb-3'>
                <InputGroup.Text id='basic-addon1'>Theme</InputGroup.Text>
                <FormControl
                  placeholder='Theme'
                  aria-describedby='basic-addon1'
                  onChange={(e) =>
                    setJournalEntry({
                      ...journalEntry,
                      theme: e.target.value,
                    })
                  }
                />
              </InputGroup>
              <InputGroup className='mb-3'>
                <InputGroup.Text id='basic-addon1'>Characters</InputGroup.Text>
                <FormControl
                  as='textarea'
                  placeholder='Characters in Dream'
                  aria-describedby='basic-addon1'
                  onChange={(e) =>
                    setJournalEntry({
                      ...journalEntry,
                      characters: e.target.value,
                    })
                  }
                />
              </InputGroup>
              <InputGroup className='mb-3'>
                <InputGroup.Text id='basic-addon1'>Location</InputGroup.Text>
                <FormControl
                  as='textarea'
                  placeholder='Location Dream took place'
                  aria-describedby='basic-addon1'
                  onChange={(e) =>
                    setJournalEntry({
                      ...journalEntry,
                      location: e.target.value,
                    })
                  }
                />
              </InputGroup>
              <InputGroup className='mb-3'>
                <InputGroup.Text id='basic-addon1'>
                  How I felt in my dream
                </InputGroup.Text>
                <FormControl
                  as='textarea'
                  placeholder='Location Dream took place'
                  aria-describedby='basic-addon1'
                  onChange={(e) =>
                    setJournalEntry({
                      ...journalEntry,
                      feeling: e.target.value,
                    })
                  }
                />
              </InputGroup>
              <InputGroup className='mb-3'>
                <InputGroup.Text id='basic-addon1'>
                  Interpretation
                </InputGroup.Text>
                <FormControl
                  as='textarea'
                  placeholder='Location Dream took place'
                  aria-describedby='basic-addon1'
                  onChange={(e) =>
                    setJournalEntry({
                      ...journalEntry,
                      interpretation: e.target.value,
                    })
                  }
                />
              </InputGroup>
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

      <div>
        <Modal
          show={showEdit}
          onHide={() => setShowEdit(false)}
          dialogClassName='modal-90w'
          backdrop='static'
          aria-labelledby='example-custom-modal-styling-title'
          style={{
            background:
              'linear-gradient(90deg, rgba(50,85,139,1) 0%, rgba(135,114,173,1) 100%)',
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title id='example-custom-modal-styling-title'>
              <Row>
                <Col>
                  <InputGroup className='mb-3'>
                    <InputGroup.Text size='lg'>Title</InputGroup.Text>

                    <FormControl
                      size='lg'
                      defaultValue={editPost.title}
                      aria-label='Username'
                      aria-describedby='basic-addon1'
                      onChange={(e) =>
                        setEditPost({
                          ...editPost,
                          title: e.target.value,
                        })
                      }
                    />
                  </InputGroup>
                </Col>
                <Col xs={3}>
                  <FormControlLabel
                    style={{ float: 'right' }}
                    control={
                      <Checkbox
                        checked={editPost.favorite}
                        icon={<StarBorderIcon />}
                        checkedIcon={<StarIcon />}
                        name='checkedH'
                        onChange={(e) => {
                          setEditPost({
                            ...editPost,
                            favorite: e.target.checked,
                          });
                        }}
                      />
                    }
                    label='Favorite'
                  />
                </Col>
              </Row>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ height: '300px' }}>
            <Form.Group
              className='mb-3'
              controlId='exampleForm.ControlTextarea1'
            >
              <Form.Label>Journal Description</Form.Label>
              <Form.Control
                defaultValue={editPost.description}
                as='textarea'
                style={{ fontSize: '1rem' }}
                rows={9}
                onChange={(e) =>
                  setEditPost({
                    ...editPost,
                    description: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Modal.Body>
          <InputGroup className='mb-3'>
            <InputGroup.Text size='lg' style={{ marginLeft: '14px' }}>
              theme
            </InputGroup.Text>

            <FormControl
              defaultValue={editPost.theme}
              as='textarea'
              style={{ fontSize: '1rem' }}
              onChange={(e) =>
                setEditPost({
                  ...editPost,
                  theme: e.target.value,
                })
              }
              style={{ marginLeft: '5px', marginRight: '14px' }}
            />
          </InputGroup>
          <InputGroup className='mb-3'>
            <InputGroup.Text size='lg' style={{ marginLeft: '14px' }}>
              characters
            </InputGroup.Text>

            <FormControl
              as='textarea'
              style={{ fontSize: '1rem' }}
              defaultValue={editPost.characters}
              aria-label='Username'
              aria-describedby='basic-addon1'
              onChange={(e) =>
                setEditPost({
                  ...editPost,
                  characters: e.target.value,
                })
              }
              style={{ marginLeft: '5px', marginRight: '14px' }}
            />
          </InputGroup>
          <InputGroup className='mb-3'>
            <InputGroup.Text size='lg' style={{ marginLeft: '14px' }}>
              location
            </InputGroup.Text>

            <FormControl
              as='textarea'
              style={{ fontSize: '1rem' }}
              defaultValue={editPost.location}
              aria-label='Username'
              aria-describedby='basic-addon1'
              onChange={(e) =>
                setEditPost({
                  ...editPost,
                  location: e.target.value,
                })
              }
              style={{ marginLeft: '5px', marginRight: '14px' }}
            />
          </InputGroup>
          <InputGroup className='mb-3'>
            <InputGroup.Text size='lg' style={{ marginLeft: '14px' }}>
              How i felt in my dream
            </InputGroup.Text>

            <FormControl
              as='textarea'
              style={{ fontSize: '1rem' }}
              defaultValue={editPost.feeling}
              aria-label='Username'
              aria-describedby='basic-addon1'
              onChange={(e) =>
                setEditPost({
                  ...editPost,
                  feeling: e.target.value,
                })
              }
              style={{ marginLeft: '5px', marginRight: '14px' }}
            />
          </InputGroup>
          <InputGroup className='mb-3'>
            <InputGroup.Text size='lg' style={{ marginLeft: '14px' }}>
              interpretation
            </InputGroup.Text>

            <FormControl
              as='textarea'
              style={{ fontSize: '1rem' }}
              defaultValue={editPost.interpretation}
              aria-label='Username'
              aria-describedby='basic-addon1'
              onChange={(e) =>
                setEditPost({
                  ...editPost,
                  interpretation: e.target.value,
                })
              }
              style={{ marginLeft: '5px', marginRight: '14px' }}
            />
          </InputGroup>
          <Button onClick={() => updateJournal(editPost)}>Submit</Button>
        </Modal>
      </div>
      <div>
        <Modal show={showPublish} onHide={() => setShowPublish(false)}>
          <Modal.Header closeButton>
            <Modal.Title>{publishModal.publishTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{publishModal.publishDescription}</Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={() => setShowPublish(false)}>
              Close
            </Button>
            <Button variant='primary' onClick={() => modalFunc()}>
              {publishModal.buttonText}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default Home;
