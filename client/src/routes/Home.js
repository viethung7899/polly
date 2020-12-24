import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getAllPolls } from '../utils/API';

import Button from '../components/Button';
import Banner from '../components/Banner';
import Notification from '../components/Notification';

const Home = () => {
  const history = useHistory();
  const [polls, setPolls] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllPolls()
      .then((respond, reject) => {
        if (respond.status === 200) {
          setPolls(respond.data.result);
        } else {
          reject();
        }
      })
      .catch((error) => setError('Oops... Something went wrong'));
    return () => {
      setPolls([]);
      setError(null);
    };
  }, []);

  return (
    <>
      <Banner title="Home" />
      {/* Table */}
      {polls.length === 0 && !error && (
        <Notification title="It's empty here..." type="is-info">
          <Button
            title="Create new poll"
            type="is-info is-light"
            action={() => history.push('/new')}
          />
        </Notification>
      )}

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
              type="is-info is-light"
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
                  <th>Title</th>
                  <th>Created time</th>
                  <th>Progress</th>
                </tr>
              </thead>
              <tbody>
                {polls.map((poll) => {
                  return (
                    <tr
                      key={poll._id}
                      onClick={() => history.push(`/poll/${poll._id}`)}
                    >
                      <td>{poll.question}</td>
                      <td>Today 8:57 AM</td>
                      <td>Vote in progress</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}
      </div>
    </>
  );
};

export default Home;
