import { createRouter } from 'backend/context';
import { prisma } from 'db/client';
import { z } from 'zod';

export const questionRouter = createRouter()
  .query('getAll', {
    async resolve({ctx}) {
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

      return {
        question,
        isOwner: question?.ownerToken === ctx.token
      }
    }
  })
  .mutation("create", {
    input: z.object({
      title: z.string().min(5).max(100),
      options: z.array(z.string().min(1).max(100))
    }),
    async resolve({ input, ctx }) {
      if (!ctx.token) return { error: "Unauthorized" }
      return await prisma.question.create({
        data: {
          title: input.title,
          ownerToken: ctx.token,
          options: {
            createMany: {
              data: input.options.map(option => ({ name: option }))
            }
          }
        }
      })
    }
  })

