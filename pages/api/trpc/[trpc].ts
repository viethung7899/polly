import { appRouter } from '@backend/index';
import * as trpcNext from '@trpc/server/adapters/next';
import { createContext } from '@backend/context';

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
});