import React, { useState } from 'react';

import Banner from '../components/Banner';
import ButtonWithIcon from '../components/ButtonWithIcon';
import Answer from '../components/Answer';

import polls from '../data';

const poll = polls[1];

const Vote = () => {
  const [selected, setSelected] = useState(-1);
  const [voted, setVoted] = useState(false);

  const handleVote = (e, i) => {
    e.preventDefault();
    setSelected(i);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setVoted(true);
  }

  return (
    <>
      <Banner title="Vote">
        <ButtonWithIcon
          title="Cancel"
          icon="fas fa-times"
          type="is-medium is-danger"
        />
      </Banner>
      {/* Enter the poll ID */}
      <div className="container is-fluid">
        <section className="mt-6">
          <div className="field has-addons">
            <div className="control is-expanded">
              <input
                className="input is-large"
                type="text"
                placeholder="Enter the poll ID"
              />
            </div>
            <div className="control">
              <a className="button is-info is-large">Enter</a>
            </div>
          </div>
        </section>
        {/* Vote... */}
        <section className="mt-6">
          {/* Question */}
          <div className="level">
            <div className="level-left">
              <h1 className="title is-1">{poll.question}</h1>
            </div>
            <div className="level-right">
              <button className="button is-success is-medium" onClick={handleSubmit}disabled={selected < 0 || voted} >Submit</button>
            </div>
          </div>
          {/* Answers */}
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
        {/* View result */}
        {voted ? (
          <div className="container is-fluid notification is-success is-light level">
            <div className="level-left">
              <h1>Thanks for your submission</h1>
            </div>
            <div className="level-right">
              <button className="button is-success is-outlined">
                View result
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Vote;
