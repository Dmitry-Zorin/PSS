import { Spinner as ChakraSpinner, SpinnerProps } from '@chakra-ui/react'

export default function Spinner(props: SpinnerProps) {
	return (
		<ChakraSpinner
			size="xl"
			color="primary"
			thickness="4px"
			speed="0.75s"
			borderRadius="full"
			{...props}
		/>
	)
}
