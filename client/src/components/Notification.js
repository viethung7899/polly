const Notification = ({ title, type, children }) => {
  return (
    <div
      className={`container is-fluid notification level my-5 ${type} is-light`}
    >
      <div className="level-left">
        <h1>{title}</h1>
      </div>
      {children && <div className="level-right">
        {children}
      </div>}
    </div>
  );
};

export const ErrorNotification = ({ title }) => {
  return <Notification title={title} type="is-danger" />
}

export default Notification;
