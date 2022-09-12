import { TruncateOptions } from 'lodash'
import { truncate } from 'lodash/fp'

const defaultOptions: TruncateOptions = {
	length: 300,
	separator: /\W? /,
}

export default function useTruncate(options?: TruncateOptions) {
	return truncate({ ...defaultOptions, ...options })
}
