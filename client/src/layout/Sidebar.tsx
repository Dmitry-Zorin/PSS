import { ReactNode } from 'react'
import { Sidebar as RaSidebar, SidebarProps } from 'react-admin'

const Sidebar = (props: { children: ReactNode }) => (
	<RaSidebar
		size={54}
		closedSize={300}
		sx={{
			height: 'auto',
			// '& .MuiPaper-root': {
			// 	transition: ({ transitions }) => {
			// 		return transitions.create('width', {
			// 			easing: transitions.easing[isSidebarOpen ? 'easeOut' : 'easeIn'],
			// 			// duration: '1000ms',
			// 			duration:
			// 				transitions.duration[
			// 					isSidebarOpen ? 'enteringScreen' : 'leavingScreen'
			// 				],
			// 		})
			// 	},
			// },
		}}
		{...(props as SidebarProps)}
	/>
)

export default Sidebar
