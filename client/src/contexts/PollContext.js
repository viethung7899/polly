import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

import { AuthContext } from './AuthContext';

export const PollContext = createContext();

const PollContextProvider = ({ children }) => {
  const authContext = useContext(AuthContext);
  const { token } = authContext;
  const [polls, setPolls] = useState([]);
  const [selected, setSelected] = useState(null);

  const api = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}/api`,
    responseType: 'json',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

  // Fetch polls according to the token
  const fetchPolls = () => {
    return api.get('/').then((res, reject) => {
      console.log(res);
      if (res.status === 200) setPolls(res.data.polls);
      else reject(new Error('Oops... Something is wrong'));
    });
  };

  // Cleaning up
  useEffect(() => {
    return () => {
      setPolls([]);
      setSelected(null);
    };
  }, []);

  // Add new poll
  const addNewPoll = (question, answers, duration) => {
    return api
      .post('/', { question, answers, duration })
      .then((res, reject) => {
        if (res.status === 200) return res.data.pollID;
        else reject(new Error('Oops... Something is wrong'));
      });
  };

  // Get poll by id
  const fetchPollById = (id) => {
    // Find in server
    return api.get(`/${id}`).then((res, reject) => {
      if (res.status === 200) {
        setSelected(res.data);
        return res.data;
      } else reject(new Error('Oops... Something is wrong'));
    });
  };

  // Vote
  const vote = (pollID, answerID) => {
    return api.post('/vote', { pollID, answerID }).then((res, reject) => {
      if (res.status !== 200) reject(new Error('Oops... Something is wrong'));
      else return;
    });
  };

  const resetSelection = () => {
    setSelected(null);
  };

  return (
    <PollContext.Provider
      value={{
        token,
        polls,
        selected,
        fetchPolls,
        addNewPoll,
        fetchPollById,
        vote,
        resetSelection,
      }}
    >
      {children}
    </PollContext.Provider>
  );
};

export default PollContextProvider;
