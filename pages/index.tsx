import { trpc } from 'utils/trpc'
import type { NextPage } from 'next'
import Link from 'next/link'

const Home: NextPage = () => {
  const { isLoading, data } = trpc.useQuery(["questions.getAll"])

  if (isLoading || !data) return <div>Loading...</div>

  return <div className='p-4 space-x-4'>
    {data.map(question =>
      <Link key={question.id} href={`/poll/${question.id}`} className="text-2xl hover:font-medium">
        {question.title}
      </Link>
    )}
  </div>
}

export default Home

