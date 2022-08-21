import { createReactQueryHooks } from '@trpc/react';
import { AppRouter } from '../backend';


export const trpc = createReactQueryHooks<AppRouter>();