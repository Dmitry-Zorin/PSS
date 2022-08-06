import { QueryClientConfig } from '@tanstack/react-query'
import { mutate, query } from 'utils/requests'

type QueryKey = [string, Record<string, unknown>]

export interface MutationVariables {
	path: string
	options: RequestInit
}

export const queryClientConfig: QueryClientConfig = {
	defaultOptions: {
		queries: {
			staleTime: 60 * 1000,
			queryFn: async ({ queryKey }) => {
				const [subpath, params] = queryKey as QueryKey
				return query(subpath, params)
			},
		},
		mutations: {
			mutationFn: async (variables) => {
				const { path, options } = variables as MutationVariables
				return mutate(path, options)
			},
		},
	},
}

export default queryClientConfig
