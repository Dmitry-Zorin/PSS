import { Box } from '@chakra-ui/react'
import { useSidebarState } from 'contexts'
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
		<Box position="relative">
			<Box
				as={motion.nav}
				flexShrink={0}
				position="sticky"
				top={offset}
				borderRight="1px"
				borderColor="chakra-border-color"
				animate={{
					width: isSidebarOpen ? 290 : 64,
					transition: gentleSpringConfig,
				}}
			>
				<Box
					height={`calc(100vh - ${offset}px)`}
					overflowX="hidden"
					overflowY="auto"
				>
					{children}
				</Box>
			</Box>
		</Box>
	)
}
