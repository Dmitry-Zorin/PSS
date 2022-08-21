import { useRouter } from 'next/router'
import { parseUrl, StringifiableRecord, stringifyUrl } from 'query-string'

export default function useRedirect(url?: string) {
	const router = useRouter()
	return (query: StringifiableRecord) => {
		return router.push(
			stringifyUrl({
				url: url ?? parseUrl(router.asPath).url,
				query,
			}),
		)
	}
}
