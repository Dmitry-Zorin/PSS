import { AdminPanelSettings, School } from '@mui/icons-material'
import { Divider } from '@mui/material'
import resources from 'pages/resources'
import { Menu as RaMenu, usePermissions } from 'react-admin'
import { CountProvider } from '../../CountContext'
import { MenuItem, SubMenu } from './components'

function getMenuItems(resources) {
	return Object.keys(resources).map((e) => <MenuItem key={e} name={e} />)
}

export const Menu = () => {
	const { permissions } = usePermissions()

	return (
		<RaMenu>
			<CountProvider>
				{getMenuItems(resources.main)}
				<SubMenu name="menu.publications" icon={<School />}>
					{getMenuItems(resources.publications)}
				</SubMenu>
				{permissions && (
					<>
						<Divider sx={{ m: 1 }} />
						<SubMenu name="menu.admin" icon={<AdminPanelSettings />}>
							{getMenuItems(resources.admin)}
						</SubMenu>
					</>
				)}
			</CountProvider>
		</RaMenu>
	)
}
