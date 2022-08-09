import { useRouter } from 'next/router'

export default function useRouterQuery() {
	const router = useRouter()
	return router.query as Record<string, string>
}
