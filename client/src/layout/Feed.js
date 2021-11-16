import React, { useState, useEffect } from 'react';
import {
  Container,
  Card,
  Badge,
  DropdownButton,
  Dropdown,
  Form,
  FormControl,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Pagination from '../components/Pagination';
import axios from 'axios';
import CommentIcon from '@mui/icons-material/Comment';
import SortIcon from '@mui/icons-material/Sort';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
const Feed = () => {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      'x-auth-token': token,
    },
  };

  const [loading, setLoading] = useState('');
  const [search, setSearch] = useState('');
  const [clearFilter, setClearFilter] = useState(false);
  const [journals, setJournals] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);
  // pagination // get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = journals?.slice(indexOfFirstPost, indexOfLastPost);

  //Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const fetchJournals = async () => {
    setLoading(true);
    const res = await axios.get('/api/feed/');

    setJournals(res.data);
    setLoading(false);
  };

  const dropDownFilter = async (option) => {
    const res = await axios.get('/api/feed/');
    if (option === 1) {
      fetchJournals();
    }
    if (option === 2) {
      const oldestJournals = res.data.reverse().map((journal) => journal);

      setJournals(oldestJournals);
    }
  };

  const searchHandler = async (e) => {
    e.preventDefault();

    if (search === '') {
      alert('please type something into search bar');
    } else {
      const res = await axios.get('/api/feed', config);
      console.log(res);
      const filteredJournals = res.data.filter((journal) => {
        const regex = new RegExp(`^${search}`, 'gi');
        return (
          journal.title.match(regex) ||
          journal.description.match(regex) ||
          journal.theme.match(regex) ||
          journal.feeling.match(regex)
        );
      });
      console.log(filteredJournals);
      setJournals(filteredJournals);
      setClearFilter(true);
    }
  };

  const clearSearch = () => {
    fetchJournals();
    setClearFilter(false);
  };

  useEffect(() => {
    fetchJournals();
  }, []);
  return (
    <>
      <Container
        style={{
          background:
            ' linear-gradient(90deg, rgba(59,126,161,1) 0%, rgba(29,2,51,1) 100%)',
          padding: '20px',
          marginTop: '25px',
          borderRadius: '15px',
          width: 'auto',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <OverlayTrigger
          placement='top'
          delay={{ show: 250, hide: 400 }}
          overlay={<Tooltip>Filter Public Journals</Tooltip>}
        >
          <Form onSubmit={(e) => searchHandler(e)}>
            <FormControl
              style={{
                width: '20em',
                borderRadius: '20px',
                marginRight: '5px',
              }}
              className='searchBar'
              type='text'
              placeholder='search... '
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Form>
        </OverlayTrigger>

        {clearFilter && (
          <OverlayTrigger
            placement='top'
            delay={{ show: 250, hide: 400 }}
            overlay={<Tooltip>Clear Search</Tooltip>}
          >
            <HighlightOffIcon
              onClick={() => clearSearch()}
              style={{ fontSize: '35px', color: 'red' }}
            />
          </OverlayTrigger>
        )}
        <OverlayTrigger
          placement='top'
          delay={{ show: 250, hide: 400 }}
          overlay={<Tooltip>Sort Journals</Tooltip>}
        >
          <DropdownButton id='dropdown-basic-button' title={<SortIcon />}>
            <Dropdown.Item onClick={() => dropDownFilter(1)}>
              Newest
            </Dropdown.Item>
            <Dropdown.Item onClick={() => dropDownFilter(2)}>
              Oldest
            </Dropdown.Item>
          </DropdownButton>
        </OverlayTrigger>
      </Container>
      <Container
        style={{
          background:
            ' linear-gradient(90deg, rgba(59,126,161,1) 0%, rgba(29,2,51,1) 100%)',
          padding: '20px',
          marginTop: '5px',
          borderRadius: '15px',
          width: 'auto',
          alignItems: 'center',
        }}
      >
        {currentPosts.map((journal) => (
          <OverlayTrigger
            placement='right'
            delay={{ show: 250, hide: 400 }}
            overlay={<Tooltip>Read Journal Entry</Tooltip>}
          >
            <Card
              style={{
                width: '26rem',
                marginLeft: 'auto',
                marginRight: 'auto',
                marginBottom: '10px',
              }}
            >
              <Card.Header style={{ textAlign: 'center' }}>
                {journal.title}
              </Card.Header>
              <Link
                to={`/FeedJournal/${journal._id}`}
                style={{ textDecoration: 'none', color: 'black' }}
              >
                <Card.Body className='feedBody'>
                  {journal.description}
                </Card.Body>
              </Link>
              <Card.Footer
                style={{
                  display: 'flex',
                  justifyContent: 'space-evenly',
                  alignItems: 'baseline',
                }}
              >
                <Card.Title>
                  <CommentIcon style={{ fontSize: '30px' }} />
                  <Badge bg='secondary'>{journal.comments.length}</Badge>
                </Card.Title>

                <Card.Text>
                  Posted by {journal.publisherName}
                  <Card.Subtitle className='mb-2 text-muted'>
                    {journal.createdAt.slice(3, 10)}
                  </Card.Subtitle>
                </Card.Text>
              </Card.Footer>
            </Card>
          </OverlayTrigger>
        ))}
      </Container>
      <Container
        style={{
          background:
            ' linear-gradient(90deg, rgba(59,126,161,1) 0%, rgba(29,2,51,1) 100%)',

          marginTop: '5px',
          marginBottom: '5px',
          borderRadius: '15px',
          paddingTop: '3%',
          display: 'flex',
          justifyContent: 'center',
          width: 'auto',
        }}
      >
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={journals?.length}
          paginate={paginate}
        />
      </Container>
    </>
  );
};

export default Feed;
