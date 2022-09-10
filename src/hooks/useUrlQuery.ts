import { useRouter } from 'next/router'
import { parseUrl } from 'query-string'

export default function useUrlQuery() {
	const router = useRouter()
	return parseUrl(router.asPath).query as Record<string, string>
}
