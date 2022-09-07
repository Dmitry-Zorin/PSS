import { useEffect, useState } from 'react'

export default function useIsFirstRender() {
	const [isFirstRender, setIsFirstRender] = useState(true)

	useEffect(() => {
		setIsFirstRender(false)
	}, [])

	return isFirstRender
}
