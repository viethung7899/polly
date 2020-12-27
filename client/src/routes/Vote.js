import React, { useState, useEffect, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { PollContext } from '../contexts/PollContext';

import Banner from '../components/Banner';
import Button from '../components/Button';
import Answer from '../components/Answer';
import IDField from '../components/IDField';
import Notification from '../components/Notification';

const Vote = () => {
  const { token, selected, getPollById, vote, resetSelection } = useContext(
    PollContext
  );
  const { id } = useParams();
  const history = useHistory();
  const [answerID, setAnswerID] = useState(-1);
  const [voted, setVoted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch poll by id
  useEffect(() => {
    if (!id || !token) return;
    setLoading(true);
    getPollById(id)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
    return () => {
      resetSelection();
      setAnswerID(-1);
      setVoted(false);
    };
  }, [id, token]);

  const handleVote = (e, i) => {
    e.preventDefault();
    setAnswerID(i);
  };

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    vote(id, answerID)
      .then(() => setVoted(true))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  };

  return (
    <>
      <Banner title="Vote">
        <Button
          title="Back to home"
          type="is-danger"
          icon="fas fa-home"
          action={() => {
            history.push('/');
          }}
        />
      </Banner>
      <div className="container is-fluid">
        {/* Enter the selected ID */}
        {!selected && <IDField loading={loading} />}
        {error && <Notification title={error} type="is-danger" />}
        {selected && !error && (
          <section className="mt-6">
            <div className="level">
              <div className="level-left">
                <h1 className="title is-1">{selected.question}</h1>
              </div>
              <div className="level-right">
                <Button
                  title="Submit"
                  type="is-success is-medium"
                  action={handleSubmit}
                  loading={loading}
                  disabled={voted || answerID < 0}
                />
              </div>
            </div>
            <div className="options">
              {selected.answers.map((answer, index) => {
                return (
                  <Answer
                    key={index}
                    title={answer.answer}
                    selected={index === answerID}
                    action={!voted ? (e) => handleVote(e, index) : null}
                  />
                );
              })}
            </div>
          </section>
        )}

        {/* View result */}
        {voted ? (
          <Notification
            title="Thank you for your submission"
            type="is-success is-light"
          >
            <Button
              title="View result"
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
