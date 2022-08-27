import { HStack, StackProps } from '@chakra-ui/react'

export default function CardHeader(props: StackProps) {
	return (
		<HStack
			spacing={1}
			px={2}
			pt={2}
			pb={1}
			color="text-on-layer-1"
			{...props}
		/>
	)
}
