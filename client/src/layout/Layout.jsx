import { useMediaQuery } from '@mui/material'
import { Layout as RaLayout } from 'react-admin'
import { AppBar } from './app-bar/AppBar'
import { Menu } from './menu/Menu'
import { ScrollTopButton } from './ScrollTopButton'
import { Sidebar } from './Sidebar'

export const Layout = ({ children }) => (
	<RaLayout
		appBar={AppBar}
		sidebar={Sidebar}
		menu={Menu}
		sx={{
			'& .RaLayout-appFrame': {
				mt: 0,
			},
		}}
	>
		{children}
		{useMediaQuery((theme) => theme.breakpoints.up('md')) && (
			<ScrollTopButton />
		)}
	</RaLayout>
)
