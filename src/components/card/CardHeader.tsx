import { HStack, StackProps } from '@chakra-ui/react'

export default function CardHeader(props: StackProps) {
	return (
		<HStack
			spacing={1}
			p={2}
			color="text-on-layer-1"
			bg="bg-layer-1"
			_groupHover={{
				bg: 'bg-layer-2',
			}}
			{...props}
		/>
	)
}
