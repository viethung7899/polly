const Banner = (props) => {
  const { title, children } = props;

  return (
    <section className="hero is-primary">
      <div className="hero-body">
        <div className="container level">
          <div className="level-left">
            <h1 className="title is-1">{title}</h1>
          </div>
          <div className="level-right">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
