import { Question } from "@prisma/client";
import { OptionWithCount } from "backend/router/questions";
import { useEffect } from "react";
import styles from "styles/button.module.css";
import { trpc } from "utils/trpc";
import BackButton from "./BackButton";

type Props = {
  question: Question;
  options: OptionWithCount[];
  expired?: boolean;
}

const PollResult: React.FC<Props> = ({ question, options, expired }) => {
  const client = trpc.useContext();

  useEffect(() => {
    const timer = !expired ? setInterval(() => {
      client.invalidateQueries(["questions.getById", { id: question.id }])
    }, 2_000) : undefined;
    return () => {
      clearInterval(timer);
    }
  }, [client, question.id, expired]);

  const total = options.map(option => option._count?.votes || 0).reduce((prev, curr) => prev + curr, 0);

  return <>
    {total === 0 && <div className="p-4 text-yellow-700 bg-yellow-200 rounded-md w-full text-center">No one voted yet</div>}
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
          {total !== 0 && <div className="text-xl">{count}</div>}
        </div>)
    })}
    <BackButton />
  </>
}

export default PollResult;