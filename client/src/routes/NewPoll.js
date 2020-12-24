import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import copy from 'copy-to-clipboard';

import AnswerField from '../components/AnswerField';
import Banner from '../components/Banner';
import Button from '../components/Button';
import Notification from '../components/Notification';

import { createNewPoll } from '../utils/API';

// Copy URL
const copyPollURLForVoting = (submissionID) => {
  // Build share URL
  let shareURL = window.location.hostname;
  if (window.location.port.length > 0) {
    shareURL += ':' + window.location.port;
  }
  shareURL += '/vote/' + submissionID;

  // Copy to clipboard
  copy(shareURL);
}


const NewPoll = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  // Handle change in question field
  const [question, setQuestion] = useState('');
  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  // Handle change in answer fields
  const [answers, setAnswers] = useState(['', '']);

  const handleAnswerChange = (event, index) => {
    const newAnswers = [...answers];
    newAnswers[index] = event.target.value;
    setAnswers(newAnswers);
  };

  // Handle all buttons
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

  // Handle the validity of the field
  const [valid, setValid] = useState(false);
  useEffect(() => {
    const validQuestion = question.trim().length > 0;
    let validAnswers = answers.length >= 2;
    answers.forEach(
      (answer) => (validAnswers = validAnswers && answer.trim().length > 0)
    );
    setValid(validQuestion && validAnswers);
    return () => {};
  }, [question, answers]);

  // Handle submission
  const [submissionID, setSubmissionID] = useState(null);
  const [error, setError] = useState(null);
  const handleSubmitButton = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (!valid) {
      setLoading(false);
      return;
    }
    const respond = await createNewPoll({ question, answers });
    if (respond.status === 200) {
      console.log(respond.data.result._id);
      setSubmissionID(respond.data.result._id);
    } else {
      setError(respond.data.message);
    }
    setLoading(false);
  };

  return (
    <>
      {/* Header */}
      <Banner title="Create new poll">
        <Button
          title="Back to home"
          type="is-danger"
          icon="fas fa-home"
          action={() => {
            history.push('/');
          }}
        />
      </Banner>
      {/* Fields */}
      <div className="container is-fluid mt-6">
        <div className="field">
          <div className="control is-large">
            <input
              className="input is-info is-large"
              type="text"
              placeholder="Your question..."
              value={question}
              onChange={handleQuestionChange}
              disabled={submissionID}
            />
          </div>
        </div>
        <hr />
        {answers.map((answer, index) => {
          return (
            <AnswerField
              key={index}
              answer={answer}
              handleChange={(e) => handleAnswerChange(e, index)}
              handleDelete={(e) => handleDeleteButton(e, index)}
              canDelete={answers.length > 2 && !submissionID}
              disabled={submissionID}
            />
          );
        })}
        <hr />
        {/* Controls */}
        <div className="level">
          <div className="level-left">
            <Button
              title="Add another answer"
              type="is-info"
              icon="fa fa-plus"
              action={handleAddButton}
              disabled={submissionID}
            />
          </div>
          <div className="level-right">
            <Button
              title="Create poll"
              type="is-success"
              disabled={!valid || loading || submissionID}
              action={handleSubmitButton}
            />
          </div>
        </div>
        {/* Message */}
        {submissionID ? (
          <Notification
            title={`Your poll is created`}
            type="is-success is-light"
          >
            <div className="buttons">
              <Button
                title="Copy poll URL"
                type="is-success is-outlined"
                icon="fas fa-link"
                action={() => copyPollURLForVoting(submissionID)}
              />
              <Button
                title="View your poll"
                type="is-success is-outlined"
                action={() => history.push(`/poll/${submissionID}`)}
              />
            </div>
          </Notification>
        ) : null}
      </div>
    </>
  );
};

export default NewPoll;
