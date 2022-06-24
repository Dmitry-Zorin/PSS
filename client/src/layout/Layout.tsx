import { Box } from '@mui/material'
import { AppBar, Menu, ScrollTopButton, Sidebar } from 'layout'
import { Layout as RaLayout, LayoutProps } from 'react-admin'

const Layout = ({ children }: LayoutProps) => (
	<Box
		sx={{
			'& .RaLayout-appFrame': {
				color: (t) => t.palette.text.primary,
				mt: '0 !important',
			},
		}}
	>
		<RaLayout appBar={() => null} sidebar={Sidebar} menu={Menu}>
			<AppBar />
			{children}
			<ScrollTopButton />
		</RaLayout>
	</Box>
)

export default Layout
