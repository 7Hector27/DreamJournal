import React, { useState, useEffect } from 'react';
import { Container, Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import axios from 'axios';
import CommentIcon from '@mui/icons-material/Comment';
const Feed = () => {
  const [loading, setLoading] = useState('');
  const [journals, setJournals] = useState([]);

  const fetchJournals = async () => {
    setLoading(true);
    const res = await axios.get('/api/feed/');

    setJournals(res.data);
    setLoading(false);
  };
  useEffect(() => {
    fetchJournals();
  }, []);
  return (
    <Container
      style={{
        background:
          ' linear-gradient(90deg, rgba(50,85,139,1) 0%, rgba(135,114,173,1) 100%)',
        padding: '20px',
        marginTop: '50px',
        borderRadius: '15px',
        width: 'auto',
        alignItems: 'center',
      }}
    >
      {journals.map((journal) => (
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
            <Card.Body className='feedBody'>{journal.description}</Card.Body>
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
      ))}
    </Container>
  );
};

export default Feed;
