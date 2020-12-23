import react from 'react';

const ButtonWithIcon = (props) => {
  const { icon, title, type, action } = props;
  return (
    <button className={`button ${type}`} onClick={action}>
      <span className="icon">
        <i className={icon}></i>
      </span>
      <span>{title}</span>
    </button>
  );
};

export default ButtonWithIcon;
