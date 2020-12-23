import React from 'react';
import Banner from '../components/Banner';
import ButtonWithIcon from '../components/ButtonWithIcon';
import Answer from '../components/Answer';
import polls from '../data';

const poll = polls[1];

const Result = () => {
  let maxChoice = poll.answers[0];
  poll.answers.forEach(answer => {
    if (answer.count > maxChoice.count) {
      maxChoice = answer;
    }
  });

  return (
    <>
      <Banner title="Result">
        <ButtonWithIcon
          title="Back to home page"
          icon="fas fa-home"
          type="is-medium is-info"
        />
      </Banner>
      <div className="container is-fluid mt-6">
        <section className="mt-6">
          <h1 className="title is-1">{poll.question}</h1>
          {poll.answers.map((answer) => {
            return <Answer title={answer.answer} selected={answer === maxChoice} >
              {answer.count}
            </Answer>;
          })}
        </section>
      </div>
    </>
  );
};

export default Result;
