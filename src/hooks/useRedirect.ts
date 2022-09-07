import { useRouter } from 'next/router'
import { parseUrl, StringifiableRecord, stringifyUrl } from 'query-string'

interface RedirectOptions {
	url?: string
	query?: StringifiableRecord
	prefetch?: boolean
}

export default function useRedirect() {
	const router = useRouter()

	return async (options?: RedirectOptions) => {
		if (options?.prefetch && options?.url) {
			await router.prefetch(options.url, undefined, {
				unstable_skipClientCache: true,
			})
		}
		return router.push(
			stringifyUrl({
				url: options?.url ?? parseUrl(router.asPath).url,
				query: options?.query,
			}),
		)
	}
}
