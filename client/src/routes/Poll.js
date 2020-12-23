import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import Banner from '../components/Banner';
import Button from '../components/Button';
import Answer from '../components/Answer';

import { getPollById } from '../utils/API';

const initialState = {
  question: '',
  answers: [],
};

const Result = () => {
  const { id } = useParams();
  const history = useHistory();
  const [poll, setPoll] = useState(initialState);
  const [majority, setMajority] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // Get data
      const data = await getPollById(id);
      setPoll(data);

      // Set the majority
      setMajority((_) => {
        let m = data.answers[0];
        for (const a of data.answers) {
          if (a.count > m.count) m = a;
        }
        return m;
      });
      setLoading(false);
    };
    fetchData();
    return () => {
      setPoll(initialState);
      setMajority(null);
    };
  }, [id]);

  return (
    <>
      <Banner title="Result">
        <Button
          title="Back to home page"
          icon="fas fa-home"
          type="is-medium is-info"
          action={() => history.push('/')}
        />
      </Banner>
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
