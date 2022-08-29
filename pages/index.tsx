import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { FaPlus } from 'react-icons/fa'
import buttonStyles from "styles/button.module.css"
import containerStyles from "styles/container.module.css"
import { trpc } from 'utils/trpc'

const HomeContent = () => {
  const { isLoading, data } = trpc.useQuery(["questions.getAll"])

  if (isLoading || !data) return (
    <>
    <div className={`${buttonStyles.skeleton} animate-pulse`}>
      <div className="text-2xl bg-slate-500 w-full h-7 mb-2 rounded-lg"></div>
      <div className='bg-slate-500 w-[50%] h-6 rounded-lg'></div>
    </div>
    <div className={`${buttonStyles.skeleton} animate-pulse`}>
      <div className="text-2xl bg-slate-500 w-full h-7 mb-2 rounded-lg"></div>
      <div className='bg-slate-500 w-[50%] h-6 rounded-lg'></div>
    </div>
    </>
  )

  return <>
    {data.map(question => (
      <Link href={`/poll/${question.id}`} key={question.id}>
        <div className={buttonStyles.poll}>
          <div className="text-2xl">{question.title}</div>
          <div className='opacity-50'><em>Created at {question.createdAt.toDateString()}</em></div>
        </div>
      </Link>
    ))}
  </>
}

const Home: NextPage = () => {
  return <div className={containerStyles.container}>
    <Head>
      <title>Polly</title>
    </Head>
    <div className='flex items-center w-full justify-between'>
    <div className="text-4xl font-bold">Your polls</div>
    <Link href="/create">
      <button className="p-2 text-xl rounded-full bg-blue-600 hover:bg-blue-700"><FaPlus /></button>
    </Link>
    </div>
    <div className={containerStyles.dashboard}>
      <HomeContent />
    </div>
    
  </div>
}

export default Home

