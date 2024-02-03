'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

const LinksList = () => {
  const [links, setLinks] = useState([]);

  async function fetchLinks() {
    const token = window.localStorage.getItem('token')
    console.log(token)
    try {
      const { data } = await axios.get(
        'https://front-test.hex.team/api/statistics?offset=0&limit=0',
        {
          headers: {
            Authorization: `Bearer ${token}`,
            accept: 'application/json',
          },
        },
      );

      setLinks(data);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    fetchLinks();
  }, []);
  return <div></div>;
};

export default LinksList;
