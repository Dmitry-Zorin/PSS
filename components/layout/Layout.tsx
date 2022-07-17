import { Box } from '@chakra-ui/react'
import {
	ActionsToolbar,
	AppBar,
	MainArea,
	Menu,
	Sidebar,
	SidebarContextProvider,
} from 'components'
import { ReactNode } from 'react'
import resources from 'resources/resources'

const APP_BAR_HEIGHT = '4rem'
const SIDEBAR_WIDTH = '18rem'
const SIDEBAR_COLLAPSED_WIDTH = '4rem'

interface LayoutProps {
	children: ReactNode
	actions?: ReactNode
	title?: ReactNode
}

export default function Layout({ children, actions, title }: LayoutProps) {
	return (
		<SidebarContextProvider>
			<AppBar h={APP_BAR_HEIGHT} />
			<Box display="flex">
				<Sidebar
					offset={APP_BAR_HEIGHT}
					width={SIDEBAR_WIDTH}
					minWidth={SIDEBAR_COLLAPSED_WIDTH}
				>
					<Menu items={resources} />
				</Sidebar>
				<Box as="main" flexGrow={1}>
					{actions && <ActionsToolbar>{actions}</ActionsToolbar>}
					<MainArea title={title}>
						{children}
						{/* <ScrollTopButton /> */}
					</MainArea>
				</Box>
			</Box>
		</SidebarContextProvider>
	)
}
