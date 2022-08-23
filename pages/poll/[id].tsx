import QuestionContent from "components/QuestionContent";
import { useRouter } from "next/router";
import { trpc } from "utils/trpc";

const PollContent: React.FC<{ id: string }> = ({ id }) => {
  const { data, isLoading, error } = trpc.useQuery(["questions.getById", { id }]);

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error</div>
  if (!data?.question) return <div>Not found</div>

  return <QuestionContent
    question={data.question}
    isOwner={data.isOwner}
    isVoted={data.isVoted}
    options={data.options} />
}

const Poll = () => {
  const { query } = useRouter();
  const { id } = query;

  if (!id || typeof id !== "string")
    return <div>Invalid!</div>

  return <PollContent id={id} />
}

export default Poll;