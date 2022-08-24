import { Question } from "@prisma/client";
import { OptionWithCount } from "backend/router/questions";
import { useState } from "react";
import styles from "styles/button.module.css";
import { trpc } from "utils/trpc";

type Props = {
  question: Question;
  options: OptionWithCount[];
}

const PollInput: React.FC<Props> = ({ question, options }) => {
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
          disabled={!!data || isLoading}
          onClick={() => setChoice(option.id)}
        >
          {option.name}
        </button>)
    })}
    <button
      disabled={!!data || isLoading || !choice}
      className={`${styles.button} bg-green-200 text-green-600 hover:enabled:bg-green-300`}
      onClick={() => choice && mutate({ optionId: choice })}
    >
      Submit
    </button>
  </>
}

export default PollInput;