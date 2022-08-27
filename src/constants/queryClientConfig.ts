import { QueryClientConfig } from '@tanstack/react-query'

const STALE_TIME = 60 * 1000

const queryClientConfig: QueryClientConfig = {
	defaultOptions: {
		queries: {
			staleTime: STALE_TIME,
		},
	},
}

export default queryClientConfig
