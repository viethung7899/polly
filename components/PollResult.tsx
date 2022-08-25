import { Question } from "@prisma/client";
import { OptionWithCount } from "server/router/questions";
import { useState } from "react";
import styles from "styles/button.module.css";
import { trpc } from "utils/trpc";
import BackButton from "./BackButton";

type Props = {
  question: Question;
  options: OptionWithCount[];
}

const PollResult: React.FC<Props> = ({ question, options }) => {
  const client = trpc.useContext();
  const [items, setItems] = useState(options.map(option => ({
    name: option.name,
    id: option.id,
    count: option._count?.votes || 0
  })));

  trpc.useSubscription(["questions.onUpdate", { questionId: question.id }], {
    onNext(vote) {
      console.log(vote);
      setItems(prev => {
        return prev.map(item => {
          if (item.id === vote.optionId) return { ...item, count: item.count + 1 }
          return item;
        })
      })
    },
    onError(err) {
      console.log("Subscription error...");
      client.invalidateQueries(["questions.getById", { id: question.id }]);
    }
  })

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