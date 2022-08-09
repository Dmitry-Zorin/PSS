import * as trpc from '@trpc/server'
import * as trpcNext from '@trpc/server/adapters/next'

export function createContext(options?: trpcNext.CreateNextContextOptions) {
	return {
		revalidate: options?.res.revalidate,
	}
}

export type Context = trpc.inferAsyncReturnType<typeof createContext>
