import React from 'react';

const Result = () => {
  return (
    <>
      <section className="hero is-primary">
        <div className="hero-body">
          <div className="container level">
            <div className="level-left">
              <h1 className="title is-1">Result</h1>
            </div>
            <div className="level-right">
              <button className="button is-medium is-danger">
                <span className="icon">
                  <i className="fas fa-times"></i>
                </span>
                <span>Back to home page</span>
              </button>
            </div>
          </div>
        </div>
      </section>
      <div className="container mt-6">
        <section className="mt-6">
          <h1 className="title is-1">Title</h1>

          <div className="options">
            <div className="is-full my-2">
              <div className="notification">First</div>
            </div>
            <div className="is-full my-2">
              <div className="notification">Second</div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Result;
