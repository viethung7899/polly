const Notification = ({ title, type, children }) => {
  return (
    <div className={`container is-fluid notification level my-2 ${type}`}>
      <div className="level-left">
        <h1>{title}</h1>
      </div>
      <div className="level-right">{children}</div>
    </div>
  );
};

export default Notification;
