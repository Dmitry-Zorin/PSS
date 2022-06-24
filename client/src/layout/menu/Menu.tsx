import { AdminPanelSettings, Info, School } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import { Permissions } from 'auth.provider'
import { CountContextProvider } from 'contexts'
import { kebabCase } from 'lodash'
import {
	Menu as RaMenu,
	SidebarToggleButton,
	usePermissions,
} from 'react-admin'
import { Link } from 'react-router-dom'
import resources from 'resources'
import { MenuItem, MenuItemLink, SubMenu } from '.'

function getMenuItems(resources: Record<string, unknown>) {
	return Object.keys(resources).map((e) => (
		<MenuItem key={e} name={kebabCase(e)} />
	))
}

const Menu = () => {
	const { permissions } = usePermissions<Permissions>()

	return (
		<RaMenu>
			<Box display="flex" alignItems="center" ml="7px" mb={1}>
				<SidebarToggleButton />
				<Typography
					component={Link}
					to="/"
					color="primary"
					variant="h5"
					fontStyle="italic"
					sx={{ textDecoration: 'none', p: 1 }}
				>
					PSS
				</Typography>
			</Box>
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
