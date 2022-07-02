import { AdminPanelSettings, Info, School } from '@mui/icons-material'
import { List } from '@mui/material'
import { Permissions } from 'auth.provider'
import { CountContextProvider } from 'contexts'
import { MenuItem, ResourceMenuItem, SubMenu } from 'layout'
import { kebabCase } from 'lodash'
import { useCallback } from 'react'
import { usePermissions } from 'react-admin'
import resources from 'resources'

const Menu = () => {
	const { permissions } = usePermissions<Permissions>()

	const getMenuItems = useCallback((resources: Record<string, unknown>) => {
		return Object.keys(resources).map((e) => (
			<ResourceMenuItem key={e} name={kebabCase(e)} />
		))
	}, [])

	return (
		<List component="nav" disablePadding>
			<MenuItem to="/about" icon={<Info />} text="pages.about" />
			{getMenuItems(resources.main)}
			<CountContextProvider>
				<SubMenu icon={<School />} name="menu.publications">
					{getMenuItems(resources.publications)}
				</SubMenu>
			</CountContextProvider>
			{permissions?.isAdmin && (
				<SubMenu icon={<AdminPanelSettings />} name="menu.admin">
					{getMenuItems(resources.admin)}
				</SubMenu>
			)}
		</List>
	)
}

export default Menu
