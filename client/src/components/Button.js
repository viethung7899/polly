const Button = (props) => {
  const { icon, title, type, action, disabled, loading, style } = props;
  return (
    <button
      className={`button ${type} ${loading && 'is-loading'}`}
      onClick={action}
      disabled={disabled}
      type="button"
      style={style}
    >
      {icon ? (
        <span className="icon">
          <i className={icon}></i>
        </span>
      ) : null}
      {title && <span>{title}</span>}
    </button>
  );
};

export default Button;
