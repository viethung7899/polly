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
  const total = options.map(option => option._count?.votes || 0).reduce((prev, curr) => prev + curr, 0);
  const client = trpc.useContext();

  useEffect(() => {
    const timer = setInterval(() => {
      client.invalidateQueries(["questions.getById", { id: question.id }])
    }, 60_000);
    return () => {
      clearInterval(timer);
    }
  }, [client, question.id]);

  return <>
    {isOwner && <div className="p-4 text-blue-600 bg-blue-200 rounded-md w-full">You made this poll</div>}
    {total === 0 && <div className="p-4 text-yellow-700 bg-yellow-200 rounded-md w-full">No one voted yet</div>}
    {options.map((option) => {
      return (
        <div
          key={option.id}
          className={`${styles.base}`}
        >
          <div className="text-xl">
            {option.name}
          </div>
          <div className="text-xl">{option._count?.votes || 0}</div>
        </div>)
    })}
  </>
}

export default PollResult;