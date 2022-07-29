import { QueryClientConfig, QueryFunction } from '@tanstack/react-query'
import { createUrlWithQuery } from 'utils/requests'

const defaultQueryFn: QueryFunction<
	any,
	[string, Record<string, any>]
> = async ({ queryKey }) => {
	const res = await fetch(
		createUrlWithQuery({
			protocol: process.env.NODE_ENV === 'production' ? 'https' : 'http',
			host: process.env.NEXT_PUBLIC_VERCEL_URL!,
			path: 'api',
			subpath: queryKey[0],
			query: queryKey[1],
		}),
	)
	if (!res.ok) {
		throw new Error(res.statusText)
	}
	return res.json()
}

export const queryClientConfig: QueryClientConfig = {
	defaultOptions: {
		queries: {
			queryFn: defaultQueryFn as any,
			staleTime: 60 * 1000,
		},
	},
}

export default queryClientConfig
