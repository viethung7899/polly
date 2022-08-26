import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { NodeHTTPCreateContextFnOptions } from '@trpc/server/adapters/node-http';
import { EventEmitter } from 'events';
import { IncomingMessage } from 'http';
import ws from 'ws';

const ee = new EventEmitter();

export async function createContext(
  opts?: trpcNext.CreateNextContextOptions | NodeHTTPCreateContextFnOptions<IncomingMessage, ws>) {
  const cookieString = opts?.req.headers.cookie || ""
  let cookies: { [key: string]: string } = {};

  cookieString.split(';').forEach(entry => {
    const parts = entry.match(/(.*?)=(.*)$/);
    if (!parts?.[1] || !parts?.[2]) return;
    cookies[parts[1].trim()] = parts[2].trim();
  })

  return {
    token: cookies["pollToken"],
    ee
  }
}

type Context = trpc.inferAsyncReturnType<typeof createContext>;

export function createRouter() {
  return trpc.router<Context>();
}