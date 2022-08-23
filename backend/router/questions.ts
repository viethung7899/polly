import { Option } from '@prisma/client';
import { createRouter } from 'backend/context';
import { prisma } from 'db/client';
import { questionValidator } from 'validation/question';
import { z } from 'zod';

export const questionRouter = createRouter()
  .query('getAll', {
    async resolve({ ctx }) {
      if (!ctx.token) return []
      return await prisma.question.findMany({
        where: {
          ownerToken: {
            equals: ctx.token
          }
        }
      });
    },
  })
  .query("getById", {
    input: z.object({
      id: z.string()
    }),
    async resolve({ input, ctx }) {
      const question = await prisma.question.findFirst({
        where: {
          id: input.id
        }
      })

      const vote = await prisma.vote.findFirst({
        where: { option: { questionId: input.id } }
      });

      const isOwner = question?.ownerToken === ctx.token
      const isVoted = vote?.voterToken === ctx.token

      const options: (Option & { _count?: { votes: number } })[] = await prisma.option.findMany({
        where: {
          questionId: input.id
        },
        include: (isOwner || isVoted) ? {
          _count: {
            select: { votes: true }
          }
        } : undefined
      })

      return { question, isOwner, isVoted, options }
    }
  })
  .mutation("create", {
    input: questionValidator,
    async resolve({ input, ctx }) {
      if (!ctx.token) throw new Error("Unauthorized");
      return await prisma.question.create({
        data: {
          title: input.title,
          ownerToken: ctx.token,
          options: {
            createMany: {
              data: input.options
            }
          }
        }
      })
    }
  })

