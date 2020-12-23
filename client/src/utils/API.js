import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  responseType: 'json',
});

// Get all polls
const getAllPolls = async () => {
  const result = await api.get('/');
  return result.data.polls;
};

// Get post by id
const getPollById = async (id) => {
  const result = await api.get(`/?pollId=${id}`);
  return result.data.polls[0];
};

// Create new poll
const createNewPoll = async (poll) => {
  return await api.post('/', poll);
};

// Vote
const vote = async (pollID, answerID) => {
  return await api.post('/vote', {
    pollID, answerID
  });
};

export { api, getAllPolls, getPollById, createNewPoll, vote };
