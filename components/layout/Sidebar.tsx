import { Box, BoxProps, HStack, IconButton } from '@chakra-ui/react'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Logo } from 'components'
import { motion } from 'framer-motion'
import { useSidebarState } from 'hooks'
import { getSpringAnimation } from 'utils'

const SIDEBAR_WIDTH = '17rem'
const SIDEBAR_COLLAPSED_WIDTH = '4.5rem'

export default function Sidebar({ children, ...props }: BoxProps) {
	const [isSidebarOpen, setSidebarOpen] = useSidebarState()

	return (
		<Box
			as={motion.nav}
			pos="sticky"
			top={0}
			h="100vh"
			overflowX="hidden"
			overflowY="auto"
			flexShrink={0}
			display={{
				base: 'none',
				md: 'block',
			}}
			initial={false}
			animate={{
				width: isSidebarOpen ? SIDEBAR_WIDTH : SIDEBAR_COLLAPSED_WIDTH,
				transition: getSpringAnimation(isSidebarOpen),
			}}
			{...props}
		>
			<HStack spacing={0} p={4}>
				<IconButton
					aria-label="Toggle Sidebar"
					// icon={<HamburgerIcon boxSize={6} />}
					icon={<FontAwesomeIcon icon={faBars} size="lg" />}
					onClick={() => setSidebarOpen(!isSidebarOpen)}
				/>
				<Box
					as={motion.div}
					pointerEvents={isSidebarOpen ? 'all' : 'none'}
					initial={false}
					animate={{ opacity: +isSidebarOpen }}
				>
					<Logo />
				</Box>
			</HStack>
			{children}
		</Box>
	)
}
