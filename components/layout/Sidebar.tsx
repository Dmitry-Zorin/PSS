import { Box, BoxProps, Center } from '@chakra-ui/react'
import { Logo } from 'components'
import { motion } from 'framer-motion'

interface SidebarProps extends BoxProps {
	onDrawerOpen: () => void
}

export default function Sidebar({
	children,
	onDrawerOpen,
	...props
}: SidebarProps) {
	return (
		<Box
			as={motion.nav}
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
