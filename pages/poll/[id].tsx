import PollInput from "components/PollInput";
import PollResult from "components/PollResult";
import TimeBanner from "components/TimeBanner";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Head from "next/head";
import { useRouter } from "next/router";
import styles from "styles/container.module.css";
import { trpc } from "utils/trpc";

dayjs.extend(relativeTime)

const PollContent: React.FC<{ id: string }> = ({ id }) => {
  const { data, isLoading, error } = trpc.useQuery(["questions.getById", { id }]);

  if (isLoading)
    return (
      <div className={`${styles.banner} text-gray-600 bg-gray-200`}>
        <Head><title>Polly | Loading...</title></Head>
        Loading...
      </div>
    )
  if (error)
    return (
      <div className={`${styles.banner} text-red-600 bg-red-200`}>
        <Head><title>Polly | Error</title></Head>
        Error
      </div>
    )
  if (!data?.question) return <div className={`${styles.banner} text-red-600 bg-red-200`}>Not found</div>;

  const endedTime = data.question.endedAt;

  return <>
    <Head><title>Polly | {data.question.title}</title></Head>
    <div className="font-bold text-4xl">{data.question.title}</div>
    {data.isOwner && <div className="px-2 py-1 font-bold bg-blue-600 text-white rounded-full">AUTHOR</div>}
    <TimeBanner endedTime={endedTime} />
    {(data.isOwner || data.isVoted)
      ? <PollResult question={data.question} options={data.options} />
      : <PollInput question={data.question} options={data.options} />
    }
  </>
}

const Poll = () => {
  const { query } = useRouter();
  const { id } = query;

  if (!id || typeof id !== "string")
    return <div>Invalid!</div>

  return <div className={styles.container}>
    <PollContent id={id} />
  </div>
}

export default Poll;