import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  responseType: 'json',
});

// Get all polls
const getAllPolls = () => {
  return api.get('/');
};

// Get post by id
const getPollById = (id) => {
  return api.get(`/?id=${id}`);
};

// Create new poll
const createNewPoll = (poll) => {
  return api.post('/', poll);
};

// Vote
const vote = (pollID, answerID) => {
  return api.post('/vote', {
    pollID, answerID
  });
};

export { api, getAllPolls, getPollById, createNewPoll, vote };
