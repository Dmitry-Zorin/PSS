import { Box } from '@chakra-ui/react'
import { useSidebarState } from 'components'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { gentleSpringConfig } from 'utils'

interface SidebarProps {
	children: ReactNode
	width: string
	minWidth: string
	offset?: string
}

export default function Sidebar({
	children,
	width,
	minWidth,
	offset = '0',
}: SidebarProps) {
	const [isSidebarOpen] = useSidebarState()

	return (
		<Box
			as={motion.nav}
			pos="sticky"
			top={offset}
			h={`calc(100vh - ${offset})`}
			overflowX="hidden"
			overflowY="auto"
			flexShrink={0}
			// borderRight="1px"
			// borderColor="inherit"
			borderRight={isSidebarOpen ? 0 : '1px'}
			borderColor="inherit"
			initial={false}
			animate={{
				width: isSidebarOpen ? width : minWidth,
				transition: gentleSpringConfig,
			}}
		>
			{children}
		</Box>
	)
}
