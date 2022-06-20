import { AdminPanelSettings, Info, School } from '@mui/icons-material'
import { Permissions } from 'auth.provider'
import { CountContextProvider } from 'contexts'
import { kebabCase } from 'lodash'
import { Menu as RaMenu, MenuProps, usePermissions } from 'react-admin'
import resources from 'resources'
import { MenuItem, MenuItemLink, SubMenu } from '.'

function getMenuItems(resources: Record<string, unknown>) {
	return Object.keys(resources).map((e) => (
		<MenuItem key={e} name={kebabCase(e)} />
	))
}

const Menu = (props: MenuProps) => {
	const { permissions } = usePermissions<Permissions>()
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
			{...props}
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

export default Menu
