import React from 'react';
import { Button, Accordion } from 'react-bootstrap';

const UserJournals = ({ posts, loading }) => {
  if (loading) {
    return <h2>Loading Journals...</h2>;
  }

  const deleteDream = (id) => {
    alert(id);
  };

  return (
    <>
      {posts.map((post) => (
        <Accordion>
          <Accordion.Item
            eventKey='1'
            style={{
              margin: '8px',
            }}
          >
            <Accordion.Header>{post.title}</Accordion.Header>
            <Accordion.Body style={{ marginBottom: '5px' }}>
              {post.description}
              <div style={{ float: 'right' }}>
                <Button style={{ marginRight: '5px' }}>Edit</Button>
                <Button onClick={() => deleteDream(post._id)} variant='danger'>
                  Delete
                </Button>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      ))}
    </>
  );
};

export default UserJournals;
