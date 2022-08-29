import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useEffect, useState } from "react";
import styles from "styles/container.module.css";

dayjs.extend(relativeTime);

const TimeBanner: React.FC<{ endedTime: Date }> = ({ endedTime }) => {
  const [now, setNow] = useState(new Date());
  const expired = now >= endedTime;

  useEffect(() => {
    const interval = !expired ? setInterval(() => {
      setNow(new Date());
    }, 1000) : undefined;
    return () => {
      clearInterval(interval);
    }
  }, [expired]);

  if (now >= endedTime) return (
    <div className={`${styles.banner} bg-red-800 bg-opacity-20 text-red-200`}>
      The poll has ended
    </div>
  )

  return (
    <div className={`${styles.banner} bg-blue-800 bg-opacity-20 text-blue-200`}>
      The poll will end in {dayjs(endedTime).from(now, true)}
    </div>)
}

export default TimeBanner;