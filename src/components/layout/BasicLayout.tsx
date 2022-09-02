import { Box } from '@chakra-ui/react'
import { ReactNode } from 'react'

export default function BasicLayout({ children }: { children: ReactNode }) {
	return (
		<Box maxW="7xl" mx="auto">
			{children}
		</Box>
	)
}
