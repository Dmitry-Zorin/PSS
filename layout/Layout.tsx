import { Box } from '@chakra-ui/react'
import { ActionsToolbar, MainArea } from 'layout'
import type { ReactNode } from 'react'
import AppBar from './AppBar'

interface LayoutProps {
	children: ReactNode
	actions?: ReactNode
	title?: ReactNode
}

const Layout = ({ children, actions, title }: LayoutProps) => (
	<>
		<AppBar />
		<Box display="flex">
			{/* <Sidebar>
				<Menu />
			</Sidebar> */}
			<Box as="main" flexGrow={1}>
				{actions && <ActionsToolbar>{actions}</ActionsToolbar>}
				<MainArea title={title}>
					{children}
					{/* <ScrollTopButton /> */}
				</MainArea>
			</Box>
		</Box>
	</>
)

export default Layout
