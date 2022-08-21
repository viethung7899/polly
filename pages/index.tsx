import type { NextPage } from 'next'
import { prisma } from '../db/client'
import { trpc } from '../utils/trpc'

const Home: NextPage = () => {
  const {isLoading, data} = trpc.useQuery(["questions.getAll"])

  if (isLoading || !data) return <div>Loading...</div>

  return (
    <div>{data[0]?.title}</div>
  )
}

export default Home

