import { useState, useEffect } from 'react';
import moment from 'moment';

export const STATUS = {
  CLOSED: {
    style: 'danger',
    message: 'Closed',
  },
  CLOSING_SOON: {
    style: 'warning',
    message: 'Closing soon',
  },
  IN_PROGRESS: {
    style: 'success',
    message: 'In progress',
  },
};

const useStatus = (poll) => {
  const [status, setStatus] = useState(STATUS.IN_PROGRESS);

  // Update status in real time
  useEffect(() => {
    let timeLeft = 0;
    if (poll) timeLeft = moment(poll.expired).diff(moment());
    let closingSoonTimer, closedTimer;

    // Initialize timer and set status
    if (timeLeft <= 0) setStatus(STATUS.CLOSED);
    else {
      closedTimer = setTimeout(() => setStatus(STATUS.CLOSED), timeLeft);
      if (timeLeft <= 60 * 1000) setStatus(STATUS.CLOSING_SOON);
      else {
        closingSoonTimer = setTimeout(() => {
          setStatus(STATUS.CLOSING_SOON);
        }, timeLeft - 60 * 1000);
      }
    }

    return () => {
      // Clear time out
      clearTimeout(closedTimer);
      clearTimeout(closingSoonTimer);
      setStatus(STATUS.IN_PROGRESS);
    };
  }, [poll]);

  return status;
};

export default useStatus;
