import { Box, Flex } from '@chakra-ui/react'
import { AppBar, MainMenu, Sidebar } from 'components'
import resources from 'constants/resources'
import { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<Flex>
			<Sidebar>
				<MainMenu items={resources} />
			</Sidebar>
			<Box
				as="main"
				flexGrow={1}
				minW={0}
				minH="100vh"
				bg="bg"
				px={{ base: 2, sm: 4 }}
			>
				<AppBar />
				{children}
			</Box>
		</Flex>
	)
}
