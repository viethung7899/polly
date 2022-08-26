import { Question, Vote } from "@prisma/client";
import Pusher from "pusher-js";
import { useEffect, useState } from "react";
import { OptionWithCount } from "server/router/questions";
import styles from "styles/button.module.css";
import BackButton from "./BackButton";

type Props = {
  question: Question;
  options: OptionWithCount[];
}

Pusher.logToConsole = true;

const PollResult: React.FC<Props> = ({ question, options }) => {
  const [items, setItems] = useState(options.map(option => ({
    name: option.name,
    id: option.id,
    count: option._count?.votes || 0
  })));

  const onNewVote = (vote: Vote) => {
    setItems(prev => prev.map(item =>
      item.id !== vote.optionId ? item : { ...item, count: item.count + 1 }));
  };


  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!
    });
    const name = `question-${question.id}`;
    pusher.subscribe(name).bind("new-vote", onNewVote);
    return () => {
      pusher.unbind("new-vote");
      pusher.unsubscribe(name);
      pusher.disconnect();
    }
  }, [question.id]);

  const total = items.reduce((prev, curr) => prev + curr.count, 0);

  return <>
    {total === 0 && <div className="p-4 text-yellow-700 bg-yellow-200 rounded-md w-full text-center">No one voted yet</div>}
    {items.map((option) => {
      return (
        <div
          key={option.id}
          className={`${styles.option} flex items-center w-full justify-between relative`}
        >
          {total !== 0 && <div className="absolute left-0 h-full bg-gray-200 rounded-md -z-10" style={{ width: `${(option.count / total) * 100}%` }} />}
          <div className="text-xl">
            {option.name}
          </div>
          {total !== 0 && <div className="text-xl">{option.count}</div>}
        </div>)
    })}
    <BackButton />
  </>
}

export default PollResult;