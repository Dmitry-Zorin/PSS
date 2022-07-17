import { Box, Container, Heading } from '@chakra-ui/react'
import type { ReactNode } from 'react'

interface MainAreaProps {
	children: ReactNode
	title?: string
	rightMenu?: ReactNode
}

export default function MainArea({
	children,
	title,
	rightMenu,
}: MainAreaProps) {
	const showWide = (title && title.split(' ').length > 3) || rightMenu

	return (
		<Container maxW={showWide ? '6xl' : '3xl'} mx="auto" pb={16}>
			{title && (
				<Box as="header" pt={6} pb={12}>
					{title && (
						<Heading as="h1" size="3xl">
							{title}
						</Heading>
					)}
				</Box>
			)}
			<Box display="flex">
				<Box as="article" w="full" maxW="3xl" mx="auto">
					{children}
				</Box>
				<Box as="aside" minW={{ base: 0, xl: 'xs' }}>
					{rightMenu}
				</Box>
			</Box>
		</Container>
	)
}
