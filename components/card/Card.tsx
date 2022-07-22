import { Stack, StackProps, useColorModeValue } from '@chakra-ui/react'

export default function Card(props: StackProps) {
	return (
		<Stack
			borderRadius="xl"
			bg="bg-50"
			borderY="1px"
			borderTopColor={useColorModeValue('inherit', 'border')}
			borderBottomColor={useColorModeValue('border', 'transparent')}
			overflow="hidden"
			{...props}
		/>
	)
}
