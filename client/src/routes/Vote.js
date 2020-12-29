import React, { useState, useEffect, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { PollContext } from '../contexts/PollContext';

import Banner from '../components/Banner';
import Button from '../components/Button';
import AnswerButton from '../components/AnswerButton';
import IDField from '../components/IDField';
import Notification, { ErrorNotification } from '../components/Notification';
import VoteDisplay from '../components/VoteDisplay';

const Vote = () => {
  const { token, selected, getPollById, vote, resetSelection } = useContext(
    PollContext
  );
  const { id } = useParams();
  const history = useHistory();
  const [voted, setVoted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch poll by id
  useEffect(() => {
    if (!id || !token) return;
    setLoading(true);
    getPollById(id)
      .catch((err) => {
        let message = 'Oops... Cannot reach to the server';
        if (err.response) message = 'Oops... ' + err.response.data.message;
        setError(message);
      })
      .finally(() => setLoading(false));
    return () => {
      resetSelection();
      setError(null);
    };
  }, [id, token]);

  const handleSubmit = (poll, answerID) => {
    setLoading(true);
    vote(poll._id, answerID)
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
        {error && <ErrorNotification title={error} />}
        {selected && (
          <VoteDisplay
            poll={selected}
            mode="vote"
            voteController={{
              submit: handleSubmit,
              voted,
            }}
          />
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
