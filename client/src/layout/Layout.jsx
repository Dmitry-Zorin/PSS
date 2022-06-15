import { useMediaQuery } from '@mui/material'
import { AppBar, Menu, ScrollTopButton, Sidebar } from 'layout'
import { Layout as RaLayout } from 'react-admin'

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
