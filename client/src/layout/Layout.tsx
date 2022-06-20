import { Theme, useMediaQuery } from '@mui/material'
import { Layout as RaLayout, LayoutProps } from 'react-admin'
import { AppBar, Menu, ScrollTopButton, Sidebar } from 'layout'

const Layout = ({ children, ...props }: LayoutProps) => (
	<RaLayout
		appBar={AppBar}
		sidebar={Sidebar}
		menu={Menu}
		style={{
			// '& .RaLayout-appFrame': {
			marginTop: 0,
			// },
		}}
		{...props}
	>
		{children}
		{useMediaQuery((theme: Theme) => theme.breakpoints.up('md')) && (
			<ScrollTopButton />
		)}
	</RaLayout>
)

export default Layout
