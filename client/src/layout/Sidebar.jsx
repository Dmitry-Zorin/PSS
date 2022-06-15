import { Sidebar as RaSidebar } from 'react-admin'

export const Sidebar = ({ children }) => {
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
