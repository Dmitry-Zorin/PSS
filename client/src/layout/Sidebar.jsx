import { Sidebar as RaSidebar, useSidebarState } from 'react-admin'

export const Sidebar = ({ children }) => {
	const [isSidebarOpen] = useSidebarState()

	return (
		<RaSidebar
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
		>
			{children}
		</RaSidebar>
	)
}
