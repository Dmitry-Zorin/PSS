import { Box, useDimensions } from '@chakra-ui/react'
import { SidebarContextProvider } from 'contexts'
import { ActionsToolbar, MainArea, Menu, Sidebar } from 'layout'
import { ReactNode, useRef } from 'react'
import AppBar from './AppBar'

const resources = {
	about: true,
	timeline: true,
	authors: true,
	publications: {
		articles: true,
		abstracts: true,
		dissertations: true,
		monographs: true,
		patents: true,
		reports: true,
		programs: true,
		textbooks: true,
	},
	admin: {
		characters: true,
	},
}

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
				<Sidebar offset={dimensions?.borderBox.height}>
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
