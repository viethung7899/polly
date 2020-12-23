const AnswerField = (props) => {
  const { answer, handleChange, handleDelete } = props;

  return (
    <div className="field has-addons">
      <p className="control is-expanded">
        <input
          className="input"
          type="text"
          placeholder="Your answer"
          onChange={handleChange}
          value={answer}
        />
      </p>
      <p class="control">
        <button class="button is-danger" onClick={handleDelete}>
          <i className="fas fa-trash-alt"></i>
        </button>
      </p>
    </div>
  );
};

export default AnswerField;
