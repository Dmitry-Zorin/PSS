import * as trpcNext from '@trpc/server/adapters/next'
import { createContext } from 'server/context'
import { appRouter } from 'server/routers/_app'

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
	responseMeta({ ctx, type, errors }) {
		if (ctx?.res && type === 'query' && errors.length === 0) {
			return {
				headers: {
					'Cache-Control': `s-maxage=1, stale-while-revalidate=${
						30 * 24 * 60 * 60
					}`,
				},
			}
		}
		return {}
	},
})
