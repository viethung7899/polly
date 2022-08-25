import { Option, Vote } from '@prisma/client';
import { Subscription } from '@trpc/server';
import { prisma } from '../db/client';
import { questionValidator } from '../../validation/question';
import { z } from 'zod';
import { createRouter } from '../context';

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
        },
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

      const expired = question && question.endedAt <= new Date();

      return { question, isOwner, isVoted: !!vote, options, expired }
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
      questionId: z.string(),
      optionId: z.string()
    }),
    async resolve({ input, ctx }) {
      if (!ctx.token) throw new Error("Unauthorized");
      const vote = await prisma.vote.create({
        data: {
          optionId: input.optionId,
          voterToken: ctx.token
        }
      });
      ctx.ee.emit(`question-${input.questionId}`, vote);
      return vote;
    }
  })
  .subscription("onUpdate", {
    input: z.object({
      questionId: z.string()
    }),
    resolve({ input, ctx }) {
      return new Subscription<Vote>((emit) => {
        const onVote = (vote: Vote) => {
          emit.data(vote);
        }
        ctx.ee.on(`question-${input.questionId}`, onVote);
        return () => {
          ctx.ee.off(`question-${input.questionId}`, onVote);
        }
      })
    }
  })


