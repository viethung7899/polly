import { Question } from "@prisma/client";
import { useEffect, useState } from "react";
import { OptionWithCount } from "server/router/questions";
import styles from "styles/button.module.css";
import { trpc } from "utils/trpc";
import BackButton from "./BackButton";

type Props = {
  question: Question;
  options: OptionWithCount[];
  expired?: boolean;
}

const PollInput: React.FC<Props> = ({ question, options }) => {
  const client = trpc.useContext();
  const [choice, setChoice] = useState<string | null>(null);
  const { mutate, data, isLoading } = trpc.useMutation("questions.vote", {
    onSuccess() {
      client.invalidateQueries(["questions.getById", { id: question.id }]);
    }
  });

  const [remaining, setRemaining] = useState(question.endedAt.getTime() - (new Date()).getTime())
  useEffect(() => {
    const timer = remaining > 0 ? setTimeout(() => {
      setRemaining(0);
    }, remaining) : undefined;
    return () => {
      clearTimeout(timer);
    }
  }, [remaining]);

  const expired = remaining <= 0;

  return <>
    {options.map((option) => {
      return (
        <button
          key={option.id}
          className={`${styles.option} disabled:opacity-50 ${choice === option.id ? "ring-4" : "ring-2"} hover:enabled:bg-opacity-30 hover:enabled:bg-white`}
          disabled={expired || !!data || isLoading}
          onClick={() => setChoice(option.id)}
        >
          {option.name}
        </button>)
    })}
    <div className="flex space-x-2">
      <BackButton />
      {!expired && <button
        disabled={!!data || isLoading || !choice}
        className={`${styles.button} text-green-400 border-green-400 hover:enabled:bg-green-400 hover:enabled:bg-opacity-20`}
        onClick={() => choice && mutate({ optionId: choice, questionId: question.id })}
      >
        Submit
      </button>}
    </div>
  </>
}

export default PollInput;