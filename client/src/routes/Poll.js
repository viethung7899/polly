import React, { useState, useEffect, useContext } from 'react';
import { useHistory, useParams, Redirect } from 'react-router-dom';

import Banner from '../components/Banner';
import Button from '../components/Button';
import AnswerButton from '../components/AnswerButton';

import { PollContext } from '../contexts/PollContext';

// Get majority from the poll
const getMajority = (poll) => {
  if (poll.answers.length < 2) return null;
  let majority = poll.answers[0];
  for (const answer of poll.answers) {
    if (answer.count > majority.count) majority = answer;
  }
  if (majority.count === 0) return null;
  return majority;
};

const Result = () => {
  const { token, selected, getPollById, resetSelection } = useContext(
    PollContext
  );
  const { id } = useParams();
  const history = useHistory();
  const [majority, setMajority] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (token)
      getPollById(id)
        .then((poll) => setMajority(getMajority(poll)))
        .catch(setError);
    return () => {
      setMajority(null);
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
        {!selected ? (
          'Loading...'
        ) : (
          <section className="mt-6">
            <h1 className="title is-1">{selected.question}</h1>
            {selected.answers.map((answer, index) => {
              return (
                <AnswerButton
                  key={index}
                  title={answer.answer}
                  selected={majority === answer}
                >
                  {answer.count}
                </AnswerButton>
              );
            })}
          </section>
        )}
      </div>
    </>
  );
};

export default Result;
