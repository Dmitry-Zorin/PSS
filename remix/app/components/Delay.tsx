import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'

interface DelayProps {
	children: ReactNode
	ms?: number
}

const Delay = ({ children, ms = 0 }: DelayProps) => {
	const [showComponent, setShowComponent] = useState(false)

	useEffect(() => {
		const timeout = setTimeout(() => setShowComponent(true), ms)
		return () => clearTimeout(timeout)
	}, [ms, setShowComponent])

	if (!showComponent) {
		return null
	}

	return <>{children}</>
}

export default Delay
