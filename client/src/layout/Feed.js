import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Feed = () => {
  const [loading, setLoading] = useState('');
  const [journals, setJournals] = useState([]);

  const fetchJournals = async () => {
    setLoading(true);
    const res = await axios.get('/api/feed/');

    setJournals(res.data);
    console.log(journals);
    setLoading(false);
  };
  useEffect(() => {
    fetchJournals();
  }, []);
  return (
    <div>
      hi
      {journals.map((journal) => (
        <h1>{journal.title}</h1>
      ))}
    </div>
  );
};

export default Feed;
