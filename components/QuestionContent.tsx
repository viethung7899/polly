import { Question } from "@prisma/client";
import { OptionWithCount } from "backend/router/questions";
import Head from "next/head";
import { useState } from "react";
import styles from "styles/button.module.css";
import { trpc } from "utils/trpc";

type Props = {
  question: Question;
  options: OptionWithCount[];
  isOwner: boolean;
  isVoted: boolean;
}

const QuestionContent: React.FC<Props> = ({ question, options, isOwner, isVoted }) => {
  const client = trpc.useContext();
  const total = options.map(option => option._count?.votes || 0).reduce((prev, curr) => prev + curr, 0);
  const haveCount = isOwner || isVoted;
  const [choice, setChoice] = useState<string | null>(null);
  const { mutate, data, isLoading } = trpc.useMutation("questions.vote", {
    onSuccess() {
      client.invalidateQueries(["questions.getById", { id: question.id }])
    }
  })


  return <div className="p-4 space-y-4 flex flex-col items-start">
    <Head>
      <title>Polly | {question.title}</title>
    </Head>
    {isOwner && <div className="p-4 text-blue-600 bg-blue-200 rounded-md w-full">You made this poll</div>}
    <div className="text-2xl font-bold">{question.title}</div>

    {haveCount && total === 0 && <div className="p-4 text-yellow-700 bg-yellow-200 rounded-md w-full">No one voted yet</div>}
    {options.map((option) => {
      return (
        <button
          key={option.id}
          className={`${styles.base} ${!haveCount && styles["not-voted"]} ${choice === option.id && 'bg-gray-200'} ${(!!data || isLoading) && "text-gray-400"}`}
          disabled={haveCount || !!data || isLoading}
          onClick={() => setChoice(option.id)}
        >
          <div className="text-xl">
            {option.name}
          </div>
          {option._count && <div className="text-xl">{option._count.votes}</div>}
        </button>)
    })}
    {!haveCount &&
      <button
        disabled={!!data || isLoading || !choice}
        className="p-2 bg-green-200 text-green-600 rounded-md hover:enabled:bg-green-300 disabled:bg-gray-200 disabled:text-gray-400"
        onClick={() => choice && mutate({ optionId: choice })}
      >
        Submit
      </button>}
  </div>
}

export default QuestionContent;