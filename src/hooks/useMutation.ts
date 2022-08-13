import {
	useMutation as useReactQueryMutation,
	UseMutationOptions,
} from '@tanstack/react-query'
import { HttpError } from 'http-errors'
import { mutate, MutateOptions } from 'utils/requests'

export default function useMutation<Data = unknown>(
	path: string,
	options?: UseMutationOptions<Data, HttpError, MutateOptions>,
) {
	return useReactQueryMutation<Data, HttpError, MutateOptions>(
		[path],
		(variables) => {
			console.log(variables)
			return mutate<Data>(path, variables)
		},
		options,
	)
}
