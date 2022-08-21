import type { NextPage } from 'next'
import Link from 'next/link'
import { trpc } from 'utils/trpc'

const HomeContent = () => {
  const { isLoading, data } = trpc.useQuery(["questions.getAll"])

  if (isLoading || !data) return <div>Loading...</div>

  return <>
    {data.map(question =>
      <Link key={question.id} href={`/poll/${question.id}`}>
        <p className="text-2xl hover:font-medium">
          {question.title}
        </p>
      </Link>
    )}
  </>
}

const Home: NextPage = () => {
  return <div className='p-4 space-y-4 flex flex-col'>
    <div className="text-4xl font-bold">Your polls</div>
    <HomeContent />
    <Link href="/create">
      <button className="p-2 bg-blue-200 text-blue-600 rounded-md">Create new poll</button>
    </Link>
  </div>
}

export default Home

