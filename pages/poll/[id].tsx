import PollInput from "components/PollInput";
import PollResult from "components/PollResult";
import Head from "next/head";
import { useRouter } from "next/router";
import styles from "styles/container.module.css";
import { trpc } from "utils/trpc";

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
  if (!data?.question) return <div className={`${styles.banner} text-red-600 bg-red-200`}>Not found</div>

  return <>
    <Head><title>Polly | {data.question.title}</title></Head>
    <div className="font-bold text-4xl">{data.question.title}</div>
    {(data.isOwner || data.isVoted)
      ? <PollResult question={data.question} options={data.options} isOwner={data.isOwner} /> 
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