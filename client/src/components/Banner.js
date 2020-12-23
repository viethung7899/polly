const Banner = (props) => {
  const { title, children } = props;

  return (
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container level">
          <div className="level-left">
            <h1 class="title is-1">{title}</h1>
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
