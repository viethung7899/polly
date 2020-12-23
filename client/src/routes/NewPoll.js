import React, { useState } from 'react';
import AnswerField from '../components/AnswerField';
import Banner from '../components/Banner';
import ButtonWithIcon from '../components/ButtonWithIcon';

const NewPoll = () => {
  // STATE: question
  const [question, setQuestion] = useState('');
  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  // STATE answers
  const [answers, setAnswers] = useState(['', '']);

  const handleAnswerChange = (event, index) => {
    const newAnswers = [...answers];
    newAnswers[index] = event.target.value;
    setAnswers(newAnswers);
  };

  const handleAddButton = (event) => {
    event.preventDefault();
    const newAnswers = [...answers, ''];
    setAnswers(newAnswers);
  };

  const handleDeleteButton = (event, index) => {
    event.preventDefault();
    const newAnswers = [...answers];
    newAnswers.splice(index, 1);
    setAnswers(newAnswers);
  };

  return (
    <>
      {/* Header */}
      <Banner title="New poll">
        <ButtonWithIcon
          icon="fas fa-times"
          type="is-medium is-danger"
          title="Cancel"
        />
      </Banner>
      {/* Fields */}
      <div className="container is-fluid mt-6">
        <div class="field">
          <div class="control is-large">
            <input
              class="input is-info is-large"
              type="text"
              placeholder="Your question..."
              value={question}
              onChange={handleQuestionChange}
            />
          </div>
        </div>
        <hr />
        {answers.map((answer, index) => {
          return (
            <AnswerField
              answer={answer}
              handleChange={(e) => handleAnswerChange(e, index)}
              handleDelete={(e) => handleDeleteButton(e, index)}
            />
          );
        })}
        <hr />
        {/* Controls */}
        <div className="level">
          <div className="level-left">
            <ButtonWithIcon
              title="Add another answer"
              type="is-info"
              icon="fa fa-plus"
              action={handleAddButton}
            />
          </div>
          <div className="level-right">
            <ButtonWithIcon
              title="Share the poll"
              type="is-success"
              icon="fas fa-link"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default NewPoll;
