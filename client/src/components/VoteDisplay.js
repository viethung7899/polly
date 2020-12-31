import { useState, useEffect } from 'react';
import useStatus, { STATUS } from '../hooks/useStatus';
import AnswerButton from './AnswerButton';
import Button from './Button';

const StatusBadge = ({ status }) => {
  const { message, style } = status;
  return (
    <Button
      title={message.toUpperCase()}
      type={`is-${style} is-rounded is-small`}
      style={{
        pointerEvents: 'none',
        boxShadow: 'none',
      }}
    />
  );
};

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

// There are 2 modes: view, vote
const VoteDisplay = ({ poll, mode, voteController }) => {
  const { question, answers } = poll;
  const status = useStatus(poll);

  // STATE for vote mode
  const [answerID, setAnswerID] = useState(-1);

  // STATE for view mode
  const [majority, setMajority] = useState(null);

  useEffect(() => {
    if (mode === 'view') setMajority(getMajority(poll));
    else setMajority(null);
    return () => {
      setMajority(null);
      setAnswerID(-1);
    };
  }, [poll, mode]);

  const handleVote = (e, answer) => {
    e.preventDefault();
    if (mode === 'vote' && status !== STATUS.CLOSED) {
      if (!voteController.voted) setAnswerID(answer.answerID);
    }
  };

  return (
    <section className="mt-6">
      {/* Header */}
      <h1 className="subtitle is-1 my-1">{question}</h1>
      <StatusBadge status={status} />

      {/* Answers */}
      <div className="options my-4">
        {answers.map((answer, index) => {
          return (
            <AnswerButton
              key={index}
              answer={answer}
              showResult={mode === 'view'}
              selected={
                mode === 'view'
                  ? answer === majority
                  : answer.answerID === answerID
              }
              action={(e) => handleVote(e, answer)}
            />
          );
        })}
      </div>
      {voteController && (
        <div className="buttons is-right">
          <Button
            title="SUBMIT"
            type="is-success"
            action={() => {
              console.log(poll.pollID);
              voteController.submit(poll.pollID, answerID);
            }}
            disabled={voteController.voted || status === STATUS.CLOSED}
          />
        </div>
      )}
    </section>
  );
};

export default VoteDisplay;
