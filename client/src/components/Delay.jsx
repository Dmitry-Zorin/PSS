import { useEffect, useState } from 'react'

export const Delay = ({ children, ms }) => {
	const [showComponent, setShowComponent] = useState(false)

	useEffect(() => {
		const timeout = setTimeout(() => setShowComponent(true), ms)
		return () => clearTimeout(timeout)
	}, [ms, setShowComponent])

	if (!showComponent) {
		return null
	}

	return children
}
