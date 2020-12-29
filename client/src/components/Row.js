import { useHistory } from 'react-router-dom';
import moment from 'moment';
import useStatus from '../hooks/useStatus';

const Row = ({ poll, onClick }) => {
  const { _id, question, created } = poll;
  const history = useHistory();
  const status = useStatus(poll);

  return (
    <tr
      style={{ cursor: 'pointer' }}
      onClick={() => history.push(`/poll/${_id}`)}
    >
      <td>{question}</td>
      <td>{moment(created).calendar()}</td>
      <td className={`has-text-${status.style}-dark`}>{status.message}</td>
    </tr>
  );
};

export default Row;
