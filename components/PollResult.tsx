import { Question } from "@prisma/client";
import { useState } from "react";
import { OptionWithCount } from "server/router/questions";
import styles from "styles/button.module.css";
import BackButton from "./BackButton";

type Props = {
  question: Question;
  options: OptionWithCount[];
}

const PollResult: React.FC<Props> = ({ options }) => {
  const [items, _] = useState(options.map(option => ({
    name: option.name,
    id: option.id,
    count: option._count?.votes || 0
  })));

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