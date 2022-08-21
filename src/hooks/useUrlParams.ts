import { useRouter } from 'next/router'

export default function useUrlParams() {
	const router = useRouter()
	return router.query as Record<string, string>
}
