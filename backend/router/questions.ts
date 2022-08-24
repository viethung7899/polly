import { Option } from '@prisma/client';
import { createRouter } from '../context';
import { prisma } from 'db/client';
import { questionValidator } from 'validation/question';
import { z } from 'zod';

export type OptionWithCount = Option & {
  _count?: { votes: number }
}

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
        where: { 
          option: { questionId: input.id },
          voterToken: ctx.token
        }
      });

      const isOwner = question?.ownerToken === ctx.token

      const options: OptionWithCount[] = await prisma.option.findMany({
        where: {
          questionId: input.id
        },
        include: (isOwner || !!vote) ? {
          _count: {
            select: { votes: true }
          }
        } : undefined
      })

      return { question, isOwner, isVoted: !!vote, options }
    }
  })
  .mutation("create", {
    input: questionValidator,
    async resolve({ input, ctx }) {
      if (!ctx.token) throw new Error("Unauthorized");
      const unixTime = (new Date()).getTime() + input.duration * 60_000;
      return await prisma.question.create({
        data: {
          title: input.title,
          ownerToken: ctx.token,
          options: {
            createMany: {
              data: input.options
            }
          },
          endedAt: new Date(unixTime)
        }
      })
    }
  })
  .mutation("vote", {
    input: z.object({
      optionId: z.string()
    }),
    async resolve({input, ctx}) {
      if (!ctx.token) throw new Error("Unauthorized");
      return await prisma.vote.create({
        data: {
          optionId: input.optionId,
          voterToken: ctx.token
        }
      })
    }
  })

