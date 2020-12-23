import React from 'react';
import ButtonWithIcon from '../components/ButtonWithIcon';
import Banner from '../components/Banner';
import polls from '../data';

const Home = () => {
  return (
    <>
      <Banner title="Home">
        <ButtonWithIcon
          icon="fa fa-plus"
          type="is-medium is-link"
          title="Add new poll"
        />
      </Banner>
      <div className="container is-fluid mt-4">
        <h1 class="title is-3">
          You have {polls.length} poll{polls.length !== 1 ? 's' : ''}
        </h1>
        <table className="table is-striped is-fullwidth is-hoverable">
          <thead>
            <tr>
              <th>Title</th>
              <th>Created time</th>
              <th>Progress</th>
            </tr>
          </thead>
          <tbody>
            {polls.map((poll) => {
              return (
                <tr>
                  <td>{poll.question}</td>
                  <td>Today 8:57 AM</td>
                  <td>Vote in progress</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Home;
