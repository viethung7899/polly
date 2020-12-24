import React, { useState, useEffect } from 'react';
import { useHistory, useParams, Redirect } from 'react-router-dom';

import Banner from '../components/Banner';
import Button from '../components/Button';
import Answer from '../components/Answer';

import { getPollById } from '../utils/API';

const initialState = {
  question: '',
  answers: [],
};

// Get majority from the poll
const getMajority = (poll) => {
  if (poll.answers.length < 2) return null;
  let majority = poll.answers[0]
  for (const answer of poll.answers) {
    if (answer.count > majority.count) majority = answer;
  }
  if (majority.count === 0) return null;
  return majority;
};

const Result = () => {
  const { id } = useParams();
  const history = useHistory();
  const [poll, setPoll] = useState(initialState);
  const [majority, setMajority] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getPollById(id)
      .then((response, reject) => {
        if (response.status === 200) {
          const newPoll = response.data.result;
          setPoll(newPoll);
          setMajority(getMajority(newPoll));
        } else {
          reject(response);
        }
        setLoading(false);
      })
      .catch((e) => {
        console.log(error);
        setError('Oops... Something went wrong');
        setLoading(false);
      });

    // Cleanup
    return () => {
      setPoll(initialState);
      setMajority(null);
    };
  }, [id]);

  return (
    <>
      {error && <Redirect to="/not-found"></Redirect>}
      <Banner title="Result" />
      <div className="container is-fluid mt-6">
        {loading ? (
          'Loading...'
        ) : (
          <section className="mt-6">
            <h1 className="title is-1">{poll.question}</h1>
            {poll.answers.map((answer, index) => {
              return (
                <Answer
                  key={index}
                  title={answer.answer}
                  selected={majority === answer}
                >
                  {answer.count}
                </Answer>
              );
            })}
          </section>
        )}
      </div>
    </>
  );
};

export default Result;
