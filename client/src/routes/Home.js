import React from 'react';

const Home = () => {
  return (
    <>
      <section class="hero is-primary">
        <div class="hero-body">
          <div class="container level">
            <div className="level-left">
              <h1 class="title is-1">Polls</h1>
            </div>
            <div className="level-right">
              <button className="button is-medium is-link">
                <span className="icon">
                  <i className="fa fa-plus"></i>
                </span>
                <span>Add new poll</span>
              </button>
            </div>
          </div>
        </div>
      </section>
      <div className="container is-fluid mt-4">
        <h1 class="title is-3">You have 1 poll</h1>
        <table className="table is-striped is-fullwidth is-hoverable">
          <thead>
            <tr>
              <th>Title</th>
              <th>Created time</th>
              <th>Progress</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Which language do you prefer?</td>
              <td>Today 8:57 AM</td>
              <td>Vote in progress</td>
            </tr>
            <tr>
              <td>Which food do you like?</td>
              <td>Today 8:57 AM</td>
              <td>Vote in progress</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Home;
