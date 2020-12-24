const Banner = (props) => {
  const { title, children, type } = props;

  return (
    <section className={`hero is-primary is-bold ${type}`}>
      <div className="hero-body level">
        <div className="level-left">
          <h1 className="title is-1">{title}</h1>
        </div>
        <div className="level-right">{children}</div>
      </div>
    </section>
  );
};

export default Banner;
