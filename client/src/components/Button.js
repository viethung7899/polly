const Button = (props) => {
  const { icon, title, type, action, disabled, loading } = props;
  return (
    <button
      className={`button ${type} ${loading ? 'is-loading' : ''}`}
      onClick={action}
      disabled={disabled}
      type="button"
    >
      {icon ? (
        <span className="icon">
          <i className={icon}></i>
        </span>
      ) : null}
      <span>{title}</span>
    </button>
  );
};

export default Button;
