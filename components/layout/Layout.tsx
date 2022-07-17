import { Box, useDimensions } from '@chakra-ui/react'
import {
	ActionsToolbar,
	MainArea,
	Menu,
	Sidebar,
	SidebarContextProvider,
} from 'components'
import { ReactNode, useRef } from 'react'
import resources from 'resources/resources'
import AppBar from './AppBar'

interface LayoutProps {
	children: ReactNode
	actions?: ReactNode
	title?: ReactNode
}

export default function Layout({ children, actions, title }: LayoutProps) {
	const appBarRef = useRef<HTMLDivElement>(null)
	const dimensions = useDimensions(appBarRef)

	return (
		<SidebarContextProvider>
			<AppBar ref={appBarRef} />
			<Box display="flex">
				<Sidebar offset={dimensions?.borderBox.height || 80}>
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
