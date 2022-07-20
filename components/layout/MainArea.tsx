import { Box, Heading } from '@chakra-ui/react'
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
		<Box maxW={{ base: showWide ? '6xl' : '3xl', xl: '6xl' }} mx="auto" pb={16}>
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
				<Box as="article" maxW="3xl">
					{children}
				</Box>
				{rightMenu && (
					<Box as="aside" minW={{ base: 0, xl: 'xs' }}>
						{rightMenu}
					</Box>
				)}
			</Box>
		</Box>
	)
}
