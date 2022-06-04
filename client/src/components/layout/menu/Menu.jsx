import {
	AdminPanelSettings,
	Filter1,
	Filter2,
	Filter3,
} from '@mui/icons-material'
import { Divider } from '@mui/material'
import resources from 'pages/resources'
import { Menu as RaMenu, usePermissions } from 'react-admin'
import { useQuery } from 'react-query'
import { fetchApi } from 'requests'
import { CountProvider } from '../../CountContext'
import { MenuItem, SubMenu } from './components'

function getMenuItems(resources = []) {
	return resources.map((e) => <MenuItem key={e} name={e} />)
}

export const Menu = () => {
	const { permissions } = usePermissions()

	const { data: categories = {} } = useQuery(['categories'], async () => {
		const { json } = await fetchApi('resources/categories')
		return json
	})

	return (
		<RaMenu>
			<CountProvider>
				{getMenuItems(Object.keys(resources.main))}
				<Divider />
				<SubMenu name="layout.menu.categoryA" icon={<Filter1 />}>
					{getMenuItems(categories.A)}
				</SubMenu>
				<SubMenu name="layout.menu.categoryB" icon={<Filter2 />}>
					{getMenuItems(categories.B)}
				</SubMenu>
				<SubMenu name="layout.menu.categoryC" icon={<Filter3 />}>
					{getMenuItems(categories.C)}
				</SubMenu>
				{permissions && (
					<>
						<Divider sx={{ mt: 1, mb: 1 }} />
						<SubMenu name="layout.menu.admin" icon={<AdminPanelSettings />}>
							{getMenuItems(Object.keys(resources.admin))}
						</SubMenu>
					</>
				)}
			</CountProvider>
		</RaMenu>
	)
}
