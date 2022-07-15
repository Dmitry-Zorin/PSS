import { Box } from '@chakra-ui/react'
import type { ReactNode } from 'react'
import AppBar from './app-bar/AppBar'

const Layout = ({ children }: { children?: ReactNode }) => (
	<>
		<AppBar />
		<Box display="flex">
			{/* <Sidebar>
				<Menu />
			</Sidebar> */}
			<Box as="main" flexGrow={1}>
				{children}
				{/* <ScrollTopButton /> */}
			</Box>
		</Box>
	</>
)

export default Layout
