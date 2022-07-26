import { Box, BoxProps } from '@chakra-ui/react'

export default function Sidebar(props: BoxProps) {
	return (
		<Box
			as="nav"
			pos="sticky"
			overflowX="hidden"
			overflowY="auto"
			flexShrink={0}
			{...props}
		/>
	)
}
