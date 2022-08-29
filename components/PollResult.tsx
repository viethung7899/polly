import { Question, Vote } from "@prisma/client";
import Pusher from "pusher-js";
import { useEffect, useState } from "react";
import { OptionWithCount } from "server/router/questions";
import buttonStyles from "styles/button.module.css";
import BackButton from "./BackButton";
import styles from "styles/container.module.css";

type Props = {
  question: Question;
  options: OptionWithCount[];
  vote: Vote | null;
}

Pusher.logToConsole = true;

const PollResult: React.FC<Props> = ({ question, options, vote }) => {
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
    {total === 0 && <div className={`${styles.banner} bg-yellow-800 bg-opacity-20 text-yellow-200`}>No one voted yet</div>}
    {items.map((option) => {
      return (
        <div
          key={option.id}
          className={`relative ${buttonStyles.option} ${vote?.optionId === option.id ? "ring-4" : "ring-2"}`}
        >
          {total !== 0 && <div className="absolute left-0 h-full bg-gray-200 bg-opacity-30 rounded-lg" style={{ width: `${(option.count / total) * 100}%` }} />}
          <div className="text-xl">
            {option.name}
          </div>
          {total !== 0 && <div className="text-xl z-10">{option.count}</div>}
        </div>)
    })}
    <BackButton />
  </>
}

export default PollResult;