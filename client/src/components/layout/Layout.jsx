import { Layout as RaLayout } from 'react-admin'
import { AppBar } from './app-bar/AppBar'
import { Menu } from './menu/Menu'
import { ScrollTopButton } from './ScrollTopButton'

export const Layout = ({ children, ...props }) => (
	<RaLayout {...props} appBar={AppBar} menu={Menu}>
		{children}
		<ScrollTopButton />
	</RaLayout>
)
