import React from 'react';

const NewPoll = () => {
  return (
    <>
      {/* Header */}
      <section className="hero is-primary">
        <div className="hero-body">
          <div className="container level">
            <div className="level-left">
              <h1 className="title is-1">New poll</h1>
            </div>
            <div className="level-right">
              <button className="button is-medium is-danger">
                <span className="icon">
                  <i className="fas fa-times"></i>
                </span>
                <span>Cancel</span>
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* Fields */}
      <div className="container is-fluid mt-6">
        <div class="field">
          <div class="control is-large">
            <input
              class="input is-info is-large"
              type="text"
              placeholder="Your question..."
            />
          </div>
        </div>
        <hr />
        <div className="field">
          <div className="control">
            <input
              className="input is-primary"
              type="text"
              placeholder="Your answer"
            />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <input
              className="input is-primary"
              type="text"
              placeholder="Your answer"
            />
          </div>
        </div>
        <hr />
        {/* Controls */}
        <div className="level">
          <div className="level-left">
            <buttton className="button is-info">
              <span className="icon">
                <i className="fa fa-plus"></i>
              </span>
              <span>Add another answer</span>
            </buttton>
          </div>
          <div className="level-right">
            <buttton className="button is-success">
              <span className="icon">
                <i className="fas fa-link"></i>
              </span>
              <span>Share</span>
            </buttton>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewPoll;
