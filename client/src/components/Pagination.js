import React from 'react';
import { Button } from 'react-bootstrap';

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul
        style={{
          display: 'flex',
          'list-style-type': 'none',
          justifyContent: 'center',
        }}
      >
        {pageNumbers.map((number) => (
          <li
            key={number}
            style={{
              display: 'inline',
              marginRight: '5px',
              marginBottom: '10px',
            }}
          >
            <Button onClick={() => paginate(number)} href=''>
              {number}
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
