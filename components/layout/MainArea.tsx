import { Box, Container, Heading } from '@chakra-ui/react'
import type { ReactNode } from 'react'

interface MainAreaProps {
	children: ReactNode
	title?: ReactNode
	rightMenu?: ReactNode
}

export default function MainArea({
	children,
	title,
	rightMenu,
}: MainAreaProps) {
	return (
		<Container maxW={{ base: '3xl', xl: '6xl' }} mx="auto" pb={16}>
			{title && (
				<Box as="header" pt={6} pb={12}>
					{typeof title === 'string' ? (
						<Heading as="h1" size="3xl">
							{title}
						</Heading>
					) : (
						title
					)}
				</Box>
			)}
			<Box display="flex">
				<Box as="article" w="full" maxW="3xl">
					{children}
				</Box>
				<Box as="aside" minW={{ base: 0, xl: 'xs' }}>
					{rightMenu}
				</Box>
			</Box>
		</Container>
	)
}
