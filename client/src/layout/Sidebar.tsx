import { ReactNode } from 'react'
import { Sidebar as RaSidebar, SidebarProps } from 'react-admin'

const Sidebar = (props: { children: ReactNode }) => (
	<RaSidebar
		{...(props as SidebarProps)}
		sx={{
			height: 'auto',
			bgcolor: (t) => t.palette.background.sidebar,
			borderRight: 1,
			borderColor: 'divider',
			'.RaSidebar-fixed': {
				height: '100vh',
			},
		}}
	/>
)

export default Sidebar
