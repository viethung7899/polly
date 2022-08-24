import { Question } from "@prisma/client";
import { OptionWithCount } from "backend/router/questions";
import { useEffect } from "react";
import styles from "styles/button.module.css";
import { trpc } from "utils/trpc";

type Props = {
  question: Question;
  options: OptionWithCount[];
  isOwner: boolean;
}

const PollResult: React.FC<Props> = ({ question, options, isOwner }) => {
  const client = trpc.useContext();
  
  useEffect(() => {
    const timer = setInterval(() => {
      client.invalidateQueries(["questions.getById", { id: question.id }])
    }, 60_000);
    return () => {
      clearInterval(timer);
    }
  }, [client, question.id]);
  
  const total = options.map(option => option._count?.votes || 0).reduce((prev, curr) => prev + curr, 0);

  
  return <>
    {isOwner && <div className="p-4 text-blue-600 bg-blue-200 rounded-md w-full">You made this poll</div>}
    {total === 0 && <div className="p-4 text-yellow-700 bg-yellow-200 rounded-md w-full">No one voted yet</div>}
    {options.map((option) => {
      const count = option._count?.votes || 0;

      return (
        <div
          key={option.id}
          className={`${styles.option} flex items-center w-full justify-between relative`}
        >
          {total !== 0 && <div className="absolute left-0 h-full bg-gray-200 rounded-md -z-10" style={{width: `${(count / total) * 100}%`}} />}
          <div className="text-xl">
            {option.name}
          </div>
          <div className="text-xl">{count}</div>
        </div>)
    })}
  </>
}

export default PollResult;