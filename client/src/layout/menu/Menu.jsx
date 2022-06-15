import { AdminPanelSettings, Info, School } from '@mui/icons-material'
import { CountContextProvider } from 'components'
import { kebabCase } from 'lodash'
import { Menu as RaMenu, MenuItemLink, usePermissions } from 'react-admin'
import resources from 'resources'
import { MenuItem, SubMenu } from '.'

function getMenuItems(resources) {
	return Object.keys(resources).map((e) => (
		<MenuItem key={e} name={kebabCase(e)} />
	))
}

export const Menu = () => {
	const { permissions } = usePermissions()
	// const [isSidebarOpen] = useSidebarState()

	return (
		<RaMenu
		// sx={{
		// 	transition: ({ transitions }) => {
		// 		return transitions.create('width', {
		// 			easing: transitions.easing[isSidebarOpen ? 'easeOut' : 'easeIn'],
		// 			duration: '1000ms',
		// 			// transitions.duration[
		// 			// 	isSidebarOpen ? 'enteringScreen' : 'leavingScreen'
		// 			// ],
		// 		})
		// 	},
		// }}
		>
			<MenuItemLink to="/about" primaryText="pages.about" leftIcon={<Info />} />
			{getMenuItems(resources.main)}
			<CountContextProvider>
				<SubMenu name="menu.publications" icon={<School />}>
					{getMenuItems(resources.publications)}
				</SubMenu>
			</CountContextProvider>
			{permissions?.isAdmin && (
				<SubMenu name="menu.admin" icon={<AdminPanelSettings />}>
					{getMenuItems(resources.admin)}
				</SubMenu>
			)}
		</RaMenu>
	)
}
