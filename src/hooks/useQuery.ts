import { HttpError } from 'http-errors'
import {
	useQuery as useReactQuery,
	UseQueryOptions,
} from '@tanstack/react-query'
import { query } from 'utils/requests'

export default function useQuery<Data>(
	path: string,
	params?: Record<string, unknown>,
	options?: UseQueryOptions<Data, HttpError>,
) {
	return useReactQuery<Data, HttpError>(
		[path, params].filter(Boolean),
		() => query<Data>(path, params),
		{
			retry: 1,
			...options,
		},
	)
}
