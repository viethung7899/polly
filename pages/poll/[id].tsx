import Head from "next/head";
import { useRouter } from "next/router";
import { trpc } from "utils/trpc";

const PollContent: React.FC<{ id: string }> = ({ id }) => {
  const { data, isLoading, error } = trpc.useQuery(["questions.getById", { id }]);

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error</div>
  if (!data?.question) return <div>Not found</div>

  const { question, isOwner, isVoted, options } = data;

  const total = options.map(option => option._count?.votes || 0).reduce((prev, curr) => prev + curr, 0);
  const haveCount = data.isOwner || data.isVoted;

  return <div className="p-4 space-y-4 flex flex-col items-start">
    <Head>
      <title>Polly | {question.title}</title>
    </Head>
    {isOwner && <div className="p-4 text-blue-600 bg-blue-200 rounded-md w-full">You made this poll</div>}
    <div className="text-2xl font-bold">{question.title}</div>

    {haveCount && <div className="p-4 text-yellow-700 bg-yellow-200 rounded-md w-full">{total === 0 ? "No one voted yet" : `Vote count: ${total}`}</div>}
    {options.map((option) => {
      return (
        <button
          key={option.id}
          className="w-full px-2 py-4 border-2 text-start font-medium rounded-md hover:enabled:bg-gray-200"
          disabled={haveCount}>
          {option.name}
        </button>)
    })}
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