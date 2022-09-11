import { Center, CenterProps } from '@chakra-ui/react'
import { Spinner } from 'components'

interface SpinnerProps extends CenterProps {
	isLoading: boolean
}

export default function Loading({
	children,
	isLoading,
	...props
}: SpinnerProps) {
	return isLoading ? (
		<Center p={10} {...props}>
			<Spinner />
		</Center>
	) : (
		<>{children}</>
	)
}
