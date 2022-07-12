import { Info } from '@mui/icons-material'
import { List } from '@mui/material'
import { Permissions } from 'auth.provider'
import { CountContextProvider } from 'contexts'
import { MenuItem, ResourceMenuItem, SubMenu } from 'layout'
import { kebabCase } from 'lodash'
import { usePermissions } from 'react-admin'
import resources from 'resources'

const Menu = () => {
	const { permissions } = usePermissions<Permissions>()

	const getMenuItems = (resources: Record<string, unknown>) => {
		return Object.keys(resources).map((e) => (
			<ResourceMenuItem key={e} name={kebabCase(e)} />
		))
	}

	return (
		<List disablePadding sx={{ pt: 1, pl: 1 }}>
			<MenuItem to="/about" icon={<Info />} text="pages.about.name" />
			{getMenuItems(resources.main)}
			<CountContextProvider>
				<SubMenu name="menu.groups.publications">
					{getMenuItems(resources.publications)}
				</SubMenu>
			</CountContextProvider>
			{permissions?.isAdmin && (
				<SubMenu name="menu.groups.admin">
					{getMenuItems(resources.admin)}
				</SubMenu>
			)}
		</List>
	)
}

export default Menu
