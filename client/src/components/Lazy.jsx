import { lazy, Suspense } from 'react'

export const Lazy = ({ component, fallback, ...props }) => {
	const Component = lazy(component)

	return (
		<Suspense fallback={fallback}>
			<Component {...props} />
		</Suspense>
	)
}
