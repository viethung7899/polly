import * as trpc from '@trpc/server';
import { z } from 'zod';
import { prisma } from '../../db/client';

export const questionRouter = trpc
  .router()
  .query('getAll', {
    async resolve() {
      return await prisma.question.findMany();
    },
  })
  .mutation('create', {
    input: z.object({
      title: z.string().min(5).max(100)
    }),
    async resolve({ input }) {
      return await prisma.question.create({
        data: {
          title: input.title
        }
      })
    }
  });

