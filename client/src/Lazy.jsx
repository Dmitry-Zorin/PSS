import React, { lazy, Suspense } from 'react'

const Lazy = ({ component, fallback, ...props }) => {
	const Component = lazy(component)
	return (
		<Suspense fallback={fallback}>
			<Component {...props} />
		</Suspense>
	)
}

export default Lazy
