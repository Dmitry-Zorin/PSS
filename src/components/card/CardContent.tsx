import { Stack, StackProps } from '@chakra-ui/react'

export default function CardContent(props: StackProps) {
	return (
		<Stack
			spacing={2}
			p={{ base: 4, sm: 6 }}
			pt={{ base: 2, sm: 3 }}
			{...props}
		/>
	)
}
