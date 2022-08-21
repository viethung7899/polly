import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';

export async function createContext(opts?: trpcNext.CreateNextContextOptions) {
  console.log(opts?.req.cookies["pollToken"])
  return {
    token: opts?.req.cookies["pollToken"]
  }
}

type Context = trpc.inferAsyncReturnType<typeof createContext>;

export function createRouter() {
  return trpc.router<Context>();
}