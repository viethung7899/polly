import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import styles from "styles/container.module.css"
import { trpc } from 'utils/trpc'

const HomeContent = () => {
  const { isLoading, data } = trpc.useQuery(["questions.getAll"])

  if (isLoading || !data) return <div>Loading...</div>

  return <>
    {data.map(question => (
      <Link href={`/poll/${question.id}`} key={question.id}>
        <div className="bg-gray-200 hover:bg-gray-300 p-2 rounded-md cursor-pointer">
          <div className="text-2xl">{question.title}</div>
          <div className='opacity-50'><em>Created at {question.createdAt.toDateString()}</em></div>
        </div>
      </Link>
    ))}
  </>
}

const Home: NextPage = () => {
  return <div className={styles.container}>
    <Head>
      <title>Polly</title>
    </Head>
    <div className="text-4xl font-bold">Your polls</div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-4">
      <HomeContent />
    </div>
    <Link href="/create">
      <button className="p-2 bg-blue-200 text-blue-600 rounded-md">Create new poll</button>
    </Link>
  </div>
}

export default Home

