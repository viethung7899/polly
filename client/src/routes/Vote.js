import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { getPollById, vote } from '../utils/API';

import Banner from '../components/Banner';
import Button from '../components/Button';
import Answer from '../components/Answer';
import IDField from '../components/IDField';
import Notification from '../components/Notification';

const initialState = {
  question: '',
  answers: [],
};

const Vote = () => {
  const { id } = useParams();
  const history = useHistory();
  const [selected, setSelected] = useState(-1);
  const [voted, setVoted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [poll, setPoll] = useState(initialState);

  // Fetch poll by id
  useEffect(() => {
    const fetchPoll = async () => {
      setLoading(true);
      if (!id) {
        setLoading(false);
        return;
      }
      // Get vote by id
      const data = await getPollById(id);
      setPoll(data);
      setLoading(false);
    };
    fetchPoll();
    return () => {
      setPoll(initialState);
      setSelected(-1);
      setVoted(false);
    };
  }, [id]);

  const handleVote = (e, i) => {
    e.preventDefault();
    setSelected(i);
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    setVoted(true);
    // TODO: Call vote API
    await vote(id, selected);
    setLoading(false);
  };

  return (
    <>
      <Banner title="Vote">
        <Button
          title="Cancel"
          icon="fas fa-times"
          type="is-medium is-danger"
          action={() => history.push('/')}
        />
      </Banner>
      {/* Enter the poll ID */}
      <div className="container is-fluid">
        {poll.question.length === 0 ? (
          <IDField loading={loading} />
        ) : (
          <section className="mt-6">
            <div className="level">
              <div className="level-left">
                <h1 className="title is-1">{poll.question}</h1>
              </div>
              <div className="level-right">
                <Button 
                  title="Submit"
                  type="is-success is-medium"
                  action={handleSubmit}
                  loading={loading}
                />
              </div>
            </div>
            <div className="options">
              {poll.answers.map((answer, index) => {
                return (
                  <Answer
                    title={answer.answer}
                    selected={index === selected}
                    action={!voted ? (e) => handleVote(e, index) : null}
                  />
                );
              })}
            </div>
          </section>
        )}
        {/* View result */}
        {voted ? (
          <Notification title="Thank you for your submission" type="is-success is-light">
            <Button title="View result" 
              type="is-success is-outlined"
              action={() => history.push(`/poll/${id}`)}
            />
          </Notification>
        ) : null}
      </div>
    </>
  );
};

export default Vote;
