import Head from "next/head";
import Link from "next/link";
import styles from "styles/container.module.css";
import { trpc } from "utils/trpc";

const PollContent = () => {
  const { isLoading, data } = trpc.useQuery(["questions.getAll"])

  if (isLoading || !data) return <div>Loading...</div>

  return <>
    {data.map(question => (
      <Link href={`/poll/${question.id}`} key={question.id}>
        <div className="bg-gray-200 hover:bg-gray-300 p-2 rounded-md min-w-full cursor-pointer">
          <a className="text-2xl font-medium">{question.title}</a>
          <div className='opacity-50'>Created at {question.createdAt.toDateString()}</div>
        </div>
      </Link>
    ))}
  </>
}

const Polls = () => {
  return <div className={styles.container}>
    <Head>
      <title>Polly | Your Polls</title>
    </Head>
    <div className="text-4xl font-bold">Your Polls</div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full">
      <PollContent />
    </div>
  </div>
};

export default Polls;