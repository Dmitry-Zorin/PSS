import { Box } from '@chakra-ui/react'
import { useSidebarState } from 'components'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { gentleSpringConfig } from 'utils'

interface SidebarProps {
	children: ReactNode
	offset?: number
}

export default function Sidebar({ children, offset = 0 }: SidebarProps) {
	const [isSidebarOpen] = useSidebarState()

	return (
		<Box
			as={motion.nav}
			pos="sticky"
			top={offset / 4}
			h={`calc(100vh - ${offset}px)`}
			overflowX="hidden"
			overflowY="auto"
			flexShrink={0}
			// borderRight="1px"
			// borderColor="inherit"
			borderRight={isSidebarOpen ? 0 : '1px'}
			borderColor="inherit"
			initial={false}
			animate={{
				width: isSidebarOpen ? 300 : 64,
				transition: gentleSpringConfig,
			}}
		>
			{children}
		</Box>
	)
}
