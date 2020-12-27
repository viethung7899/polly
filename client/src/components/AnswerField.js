const AnswerField = (props) => {
  const { answer, handleChange, handleDelete, canDelete, disabled } = props;

  return (
    <div className="field has-addons">
      <p className="control is-expanded">
        <input
          className="input"
          type="text"
          placeholder="Your answer"
          onChange={handleChange}
          value={answer}
          disabled={disabled}
        />
      </p>
      <p className="control">
        <button className="button is-danger" onClick={handleDelete} disabled={!canDelete}>
          <i className="fas fa-trash-alt"></i>
        </button>
      </p>
    </div>
  );
};

export default AnswerField;
