import { useEffect, useRef } from 'react'
import { trpc } from 'utils'

export default function usePreconnect() {
	const connRef = useRef(false)
	const preconnect = trpc.useMutation(['preconnect'])

	useEffect(() => {
		if (!connRef.current) {
			preconnect.mutate()
			connRef.current = true
		}
	}, [preconnect])
}
