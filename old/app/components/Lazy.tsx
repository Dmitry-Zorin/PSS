import { lazy, ReactNode, Suspense } from 'react'

interface LazyProps extends Record<string, any> {
	component: Parameters<typeof lazy>[0]
	fallback: ReactNode
}

const Lazy = ({ component, fallback, ...props }: LazyProps) => {
	const Component = lazy(component)
	return (
		<Suspense fallback={fallback}>
			<Component {...props} />
		</Suspense>
	)
}

export default Lazy
