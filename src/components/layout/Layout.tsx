import { Box, Flex } from '@chakra-ui/react'
import { AppBar, Head, MainArea, MainMenu, Sidebar } from 'components'
import resources from 'constants/resources'
import { MainAreaProps } from './MainArea'

interface LayoutProps extends MainAreaProps {
	headTitle?: string
}

export default function Layout({ headTitle, ...props }: LayoutProps) {
	headTitle = headTitle || props.title

	return (
		<>
			{headTitle && <Head title={headTitle} />}
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
					<MainArea {...props} />
				</Box>
			</Flex>
		</>
	)
}
