import { trpc } from "utils/trpc";
import { useRouter } from "next/router";

const PollContent: React.FC<{ id: string }> = ({ id }) => {
  const { data, isLoading, error } = trpc.useQuery(["questions.getById", { id }]);

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error</div>
  if (!data?.question) return <div>Not found</div>

  return <div className="p-4 space-y-4">
    {data.isOwner && <div className="p-4 text-blue-600 bg-blue-200 rounded-md">You made this poll</div>}
    <div className="text-2xl font-bold">{data.question.title}</div>
  </div>
}

const Poll = () => {
  const { query } = useRouter();
  const { id } = query;

  if (!id || typeof id !== "string")
    return <div>Invalid!</div>

  return <PollContent id={id} />
}

export default Poll;