import React from 'react';

const Vote = () => {
  return (
    <>
      <section className="hero is-primary">
        <div className="hero-body">
          <div className="container level">
            <div className="level-left">
              <h1 className="title is-1">Vote</h1>
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
      {/* Enter the poll ID */}
      <div className="container is-fluid">
        <section className="mt-6">
          <div className="field has-addons">
            <div className="control is-expanded">
              <input
                className="input is-large"
                type="text"
                placeholder="Enter the poll ID"
              />
            </div>
            <div className="control">
              <a className="button is-info is-large">Enter</a>
            </div>
          </div>
        </section>
        {/* Vote... */}
        <section className="mt-6">
          <div className="level">
            <div className="level-left">
              <h1 className="title is-1">Title</h1>
            </div>
            <div className="level-right">
              <button className="button is-success is-medium">Submit</button>
            </div>
          </div>

          <div className="options">
            <div className="is-full my-2">
              <div className="notification">First</div>
            </div>
            <div className="is-full my-2">
              <div className="notification">Second</div>
            </div>
          </div>
        </section>
        {/* View result */}
        <div className="container is-fluid notification is-success is-light level">
          <div className="level-left">
            <h1>Thanks for your submission</h1>
          </div>
          <div className="level-right">
            <button className="button is-success is-outlined">
              View result
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Vote;
