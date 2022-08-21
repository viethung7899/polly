import type { NextPage } from 'next'
import { prisma } from '../db/client'

const Home: NextPage<{question: string}> = ({question}) => {
  return (
    <h1>
      {question}
    </h1>
  )
}

export default Home

export const getServerSideProps = async () => {
  const question = await prisma.question.findMany();

  return {
    props: {
      question: JSON.stringify(question)
    }
  }
}
