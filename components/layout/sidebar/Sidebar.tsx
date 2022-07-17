import { Box, BoxProps } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface SidebarProps extends BoxProps {
	children: ReactNode
}

export default function Sidebar({ children, ...props }: SidebarProps) {
	return (
		<Box as="nav" {...props}>
			{children}
		</Box>
	)
}
