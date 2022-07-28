import { HStack, StackProps } from '@chakra-ui/react'

export default function CardHeader(props: StackProps) {
	return (
		<HStack
			spacing={3}
			px={3}
			py={2}
			bg="bg-layer-1"
			color="text-on-layer-1"
			// borderBottom="1px"
			// borderColor="border"
			{...props}
		/>
	)
}
