import type { NextPage } from 'next'
import Link from 'next/link'
import { trpc } from 'utils/trpc'

const HomeContent = () => {
  const { isLoading, data } = trpc.useQuery(["questions.getAll"])

  if (isLoading || !data) return <div>Loading...</div>

  return <>
    {data.map(question => <div key={question.id}>
      <Link href={`/poll/${question.id}`}>
        <a className="text-2xl hover:font-medium">{question.title}</a>
      </Link>
      <div className='opacity-50'><em>Created at {question.createdAt.toDateString()}</em></div>
    </div>
    )}
  </>
}

const Home: NextPage = () => {
  return <div className='p-4 space-y-4 flex flex-col'>
    <div className="text-4xl font-bold">Your polls</div>
    <div className="flex flex-col space-y-4">
      <HomeContent />
    </div>
    <Link href="/create">
      <button className="p-2 bg-blue-200 text-blue-600 rounded-md">Create new poll</button>
    </Link>
  </div>
}

export default Home

