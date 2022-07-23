import { Box, BoxProps } from '@chakra-ui/react'

export default function Sidebar(props: BoxProps) {
	return (
		<Box
			as="nav"
			// bg="bg-layer-1"
			borderRight="1px"
			borderColor="border"
			{...props}
		/>
	)
}
