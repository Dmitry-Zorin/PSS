import { Box, BoxProps, Center } from '@chakra-ui/react'
import { Logo } from 'components'

export default function Sidebar({ children, ...props }: BoxProps) {
	return (
		<Box
			as="nav"
			top={0}
			h="100vh"
			overflowX="hidden"
			overflowY="auto"
			flexShrink={0}
			bg="bg-layer-1"
			display={{
				base: 'none',
				md: 'block',
			}}
			{...props}
		>
			<Center h={14}>
				<Logo />
			</Center>
			{children}
		</Box>
	)
}
