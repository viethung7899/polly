import React, { useState, useEffect, useContext } from 'react';
import { useHistory, useParams, Redirect } from 'react-router-dom';

import Banner from '../components/Banner';
import Button from '../components/Button';
import VoteDisplay from '../components/VoteDisplay';

import { PollContext } from '../contexts/PollContext';

const Result = () => {
  const { token, selected, fetchPollById, resetSelection } = useContext(
    PollContext
  );
  const { id } = useParams();
  const history = useHistory();
  const [error, setError] = useState(null);

  useEffect(() => {
    if (token) fetchPollById(id).catch(setError);
    return () => {
      resetSelection();
    };
  }, [id, token]);

  return (
    <>
      {error && <Redirect to="/not-found"></Redirect>}
      <Banner title="Result">
        <Button
          title="Back to home"
          type="is-danger"
          icon="fas fa-home"
          action={() => history.push('/')}
        />
      </Banner>
      <div className="container is-fluid mt-6">
        {!selected && <div>Loading...</div>}
        {selected && <VoteDisplay poll={selected} mode="view" />}
      </div>
    </>
  );
};

export default Result;
