import * as trpcNext from '@trpc/server/adapters/next'
import { createContext } from 'server/context'
import { appRouter } from 'server/routers/_app'

export const config = {
	runtime: 'experimental-edge',
}

export default trpcNext.createNextApiHandler({
	router: appRouter,
	createContext,
	onError({ error }) {
		if (error.code === 'INTERNAL_SERVER_ERROR') {
			console.error('Something went wrong', error)
		}
	},
	batching: {
		enabled: false,
	},
})
