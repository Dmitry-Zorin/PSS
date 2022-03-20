import React, { lazy, Suspense } from 'react'
import Loading from './Loading'

const Lazy = ({ component, spinner, delay, ...props }) => {
	const Component = lazy(component)
	const fallback = <Loading spinner={spinner} delay={delay}/>
	return (
		<Suspense fallback={fallback}>
			<Component {...props}/>
		</Suspense>
	)
}

export default Lazy
