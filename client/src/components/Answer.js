const Answer = ({ title, selected, action, children }) => {
  const type = selected ? 'is-success' : '';
  return (
    <div className="is-full my-2" onClick={action}>
      <div className={`level is-mobile notification ${type}`}>
        <div className="level-left">{title}</div>
        <div className="level-right">{children}</div>
      </div>
    </div>
  );
};

export default Answer;
