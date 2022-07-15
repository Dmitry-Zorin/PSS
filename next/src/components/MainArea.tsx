import { Box, Container, Heading, Show } from '@chakra-ui/react'
import type { ReactElement, ReactNode } from 'react'

interface MainAreaProps {
	children: ReactNode
	title?: ReactElement | string
	rightMenu?: ReactNode
}

const MainArea = ({ children, title, rightMenu }: MainAreaProps) => (
	<Container maxW={rightMenu ? '6xl' : '3xl'} mx="auto" pb={16}>
		{title && (
			<Box as="header" pt={6} pb={8}>
				{typeof title === 'string' ? (
					<Heading
						as="h1"
						size="3xl"
						textAlign={title.split(' ').length < 4 ? 'center' : 'left'}
					>
						{title}
					</Heading>
				) : (
					title
				)}
			</Box>
		)}
		<Box display="flex">
			<Container as="article" maxW="3xl" mx="auto">
				{children}
			</Container>
			<Show above="xl">
				<Box as="aside" flexGrow={1}>
					{rightMenu}
				</Box>
			</Show>
		</Box>
	</Container>
)

export default MainArea
