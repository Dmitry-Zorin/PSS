import { Center, Spinner as ChakraSpinner } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface SpinnerProps {
	children?: ReactNode
	isLoading: boolean
}

export default function Spinner({ children, isLoading }: SpinnerProps) {
	return isLoading ? (
		<Center p={10}>
			<ChakraSpinner
				size="xl"
				color="primary"
				thickness="4px"
				speed="0.75s"
				borderRadius="full"
			/>
		</Center>
	) : (
		<>{children}</>
	)
}
