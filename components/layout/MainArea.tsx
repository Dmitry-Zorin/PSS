import { Box, Heading } from '@chakra-ui/react'
import type { ReactNode } from 'react'

interface MainAreaProps {
	children: ReactNode
	title?: string
}

export default function MainArea({ children, title }: MainAreaProps) {
	const isLongTitle = title && title.split(' ').length > 3

	return (
		<Box
			maxW={{ base: isLongTitle ? '6xl' : '3xl', xl: '6xl' }}
			mx="auto"
			pb={16}
		>
			{title && (
				<Box as="header" py={12}>
					{title && (
						<Heading as="h1" size={{ base: '2xl', lg: '3xl' }}>
							{title}
						</Heading>
					)}
				</Box>
			)}
			<Box as="article" maxW="3xl" w="full">
				{children}
			</Box>
		</Box>
	)
}
