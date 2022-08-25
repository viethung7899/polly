import { Question } from "@prisma/client";
import { OptionWithCount } from "backend/router/questions";
import { useState } from "react";
import styles from "styles/button.module.css";
import { trpc } from "utils/trpc";
import BackButton from "./BackButton";

type Props = {
  question: Question;
  options: OptionWithCount[];
  expired?: boolean;
}

const PollInput: React.FC<Props> = ({ question, options, expired }) => {
  const client = trpc.useContext();
  const [choice, setChoice] = useState<string | null>(null);
  const { mutate, data, isLoading } = trpc.useMutation("questions.vote", {
    onSuccess() {
      client.invalidateQueries(["questions.getById", { id: question.id }]);
    }
  })

  return <>
    {options.map((option) => {
      return (
        <button
          key={option.id}
          className={`${styles.option} hover:enabled:bg-gray-300 hover:enabled:border-gray-300 ${choice === option.id && 'bg-gray-200'} disabled:text-gray-500 diabled:bg-gray-200`}
          disabled={expired || !!data || isLoading}
          onClick={() => setChoice(option.id)}
        >
          {option.name}
        </button>)
    })}
    <div className="flex space-x-2">
      <BackButton />
      <button
        disabled={!!data || isLoading || !choice}
        className={`${styles.button} bg-green-600 text-white hover:enabled:bg-green-700`}
        onClick={() => choice && mutate({ optionId: choice })}
      >
        Submit
      </button>
    </div>
  </>
}

export default PollInput;