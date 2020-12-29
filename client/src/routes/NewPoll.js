import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { FieldArray, Formik } from 'formik';
import copy from 'copy-to-clipboard';
import * as yup from 'yup';
import Banner from '../components/Banner';
import Button from '../components/Button';
import Notification, { ErrorNotification } from '../components/Notification';
import InputField from '../components/InputField';
import TimeSelector from '../components/TimeSelector';

import { PollContext } from '../contexts/PollContext';

// Copy URL
const copyVotingURL = (submissionID) => {
  // Build share URL
  let shareURL = window.location.hostname;
  if (window.location.port.length > 0) {
    shareURL += ':' + window.location.port;
  }
  shareURL += '/vote/' + submissionID;

  // Copy to clipboard
  copy(shareURL);
};

const NewPoll = () => {
  const { addNewPoll } = useContext(PollContext);
  const history = useHistory();

  // Handle submission
  const [submissionID, setSubmissionID] = useState(null);
  const [error, setError] = useState(null);

  const validateSchema = yup.object({
    question: yup.string().required('Question is required'),
    answers: yup.array().of(yup.string().required('AnswerButton is required')),
  });

  return (
    <>
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
      {/* Form */}
      <div className="container is-fluid mt-6">
        <Formik
          initialValues={{
            question: '',
            answers: ['', ''],
            duration: {
              amount: 1,
              unit: 'minutes',
            },
          }}
          onSubmit={(values, { setSubmitting }) => {
            const { question, answers, duration } = values;
            addNewPoll(question, answers, duration)
              .then((id) => {
                setSubmissionID(id);
                setError(null);
              })
              .catch((err) => {
                let message = 'Oops... Cannot reach to the server';
                if (err.response)
                  message = 'Oops... ' + err.response.data.message;
                setError(message);
              })
              .finally(() => setSubmitting(false));
          }}
          validationSchema={validateSchema}
        >
          {({ values, isSubmitting, handleSubmit, setValues }) => (
            <form onSubmit={handleSubmit}>
              {/* Question field */}
              <InputField
                name="question"
                size="is-large"
                placeholder="Question"
                disabled={isSubmitting || submissionID}
              />
              <hr />

              {/* Answer fields */}
              <FieldArray name="answers">
                {(arrayHelpers) =>
                  values.answers.map((answer, index) => {
                    return (
                      <InputField
                        key={index}
                        name={`answers.${index}`}
                        placeholder={`AnswerButton`}
                        disabled={isSubmitting || submissionID}
                        button={{
                          type: 'is-danger',
                          icon: 'fa fa-trash',
                          action: () => arrayHelpers.remove(index),
                          disabled:
                            values.answers.length <= 2 ||
                            isSubmitting ||
                            submissionID,
                        }}
                      />
                    );
                  })
                }
              </FieldArray>
              <hr />
              {/* Control button */}
              <div className="buttons is-right">
                <TimeSelector name="duration" />
                <Button
                  title="Add another answer"
                  type="is-info"
                  icon="fa fa-plus"
                  action={() => {
                    const newValues = { ...values };
                    newValues.answers.push('');
                    setValues(newValues);
                  }}
                  disabled={values.answers.length >= 10 || submissionID}
                />
                <Button
                  title="Submit"
                  type="is-success"
                  action={handleSubmit}
                  disabled={isSubmitting || submissionID}
                />
              </div>
            </form>
          )}
        </Formik>
        {/* Show error */}
        {error && <ErrorNotification title={error} />}
        {/* Show result */}
        {submissionID && (
          <Notification
            title={`Your poll is created`}
            type="is-success is-light"
          >
            <div className="buttons">
              <Button
                title="Copy poll URL"
                type="is-success is-outlined"
                icon="fas fa-link"
                action={() => copyVotingURL(submissionID)}
              />
              <Button
                title="View your poll"
                type="is-success is-outlined"
                action={() => history.push(`/poll/${submissionID}`)}
              />
            </div>
          </Notification>
        )}
      </div>
    </>
  );
};

export default NewPoll;
