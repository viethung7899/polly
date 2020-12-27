import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

import { PollContext } from '../contexts/PollContext';

import Button from '../components/Button';
import Banner from '../components/Banner';
import Notification from '../components/Notification';

const Home = () => {
  const history = useHistory();
  const { token, polls, fetchPolls } = useContext(PollContext);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return () => {
      console.log('Leaving from home...');
    };
  }, []);

  useEffect(() => {
    console.log('Update home', token.length);
    if (token) fetchPolls().catch((err) => setError('Oops...'));
  }, [token]);

  return (
    <>
      <Banner title="Home">
        <div className="buttons">
          <Button
            title="Vote"
            type="is-warning"
            icon="fas fa-vote-yea"
            action={() => history.push('/vote')}
          />
          <Button
            title="Create new poll"
            type="is-info"
            icon="fas fa-plus"
            action={() => history.push('/new')}
          />
        </div>
      </Banner>

      {loading && <div>Loading...</div>}
      {!loading && (
        <div className="container is-fluid mt-6">
          {/* Error message */}
          {polls.length <= 0 && error && (
            <Notification title={error} type="is-danger" />
          )}

          {/* Render for empty collection */}
          {polls.length === 0 && !error && (
            <Notification title="It's empty here..." type="is-info">
              <Button
                title="Create new poll"
                type="is-info is-light is-outlined"
                action={() => history.push('/new')}
              />
            </Notification>
          )}

          {/* Render for all polls */}
          {polls.length > 0 && !error && (
            <>
              <h1 className="title is-3">
                You have {polls.length} poll{polls.length !== 1 ? 's' : ''}
              </h1>
              <table className="table is-striped is-fullwidth is-hoverable">
                <thead>
                  <tr>
                    <th>Question</th>
                    <th>Created</th>
                    <th>Progress</th>
                  </tr>
                </thead>
                <tbody>
                  {polls.map((poll) => {
                    return (
                      <tr
                        key={poll._id}
                        style={{ cursor: 'pointer' }}
                        onClick={() => history.push(`/poll/${poll._id}`)}
                      >
                        <td>{poll.question}</td>
                        <td>{moment(poll.date).calendar()}</td>
                        <td className="has-text-success">Vote in progress</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Home;
