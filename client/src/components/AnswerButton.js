const AnswerButton = ({ answer, selected, showResult, action }) => {
  const type = selected ? 'is-success' : '';
  return (
    <div className="is-full my-2">
      <div className={`level is-mobile notification ${type}`} onClick={action}>
        <div className="level-left">{answer.answer}</div>
        {showResult && <div className="level-right">{answer.count}</div>}
      </div>
    </div>
  );
};

export default AnswerButton;
