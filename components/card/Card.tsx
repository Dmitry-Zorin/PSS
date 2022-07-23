import { Stack, StackProps } from '@chakra-ui/react'

export default function Card(props: StackProps) {
	return (
		<Stack
			borderRadius="xl"
			color="text"
			overflow="hidden"
			border="1px"
			borderColor="border"
			{...props}
		/>
	)
}
