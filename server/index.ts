import superjson from 'superjson';
import { createRouter } from './context';
import { questionRouter } from './router/questions';

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("questions.", questionRouter)

// export type definition of API
export type AppRouter = typeof appRouter;