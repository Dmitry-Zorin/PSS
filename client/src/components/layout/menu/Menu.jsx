import { AdminPanelSettings, Info, School } from '@mui/icons-material'
import { Divider } from '@mui/material'
import { kebabCase } from 'lodash'
import { Menu as RaMenu, MenuItemLink, usePermissions } from 'react-admin'
import resources from 'resources'
import { CountContextProvider } from '../../CountContext'
import { MenuItem, SubMenu } from './components'

function getMenuItems(resources, prefix) {
	return Object.keys(resources).map((e) => (
		<MenuItem key={e} name={kebabCase(e)} prefix={prefix} />
	))
}

export const Menu = () => (
	<RaMenu>
		<CountContextProvider>
			<MenuItemLink to="/about" primaryText="pages.about" leftIcon={<Info />} />
			{getMenuItems(resources.main)}
			<SubMenu name="menu.publications" icon={<School />}>
				{getMenuItems(resources.publications, 'publications')}
			</SubMenu>
			{usePermissions().permissions?.isAdmin && (
				<>
					<Divider sx={{ m: 1 }} />
					<SubMenu name="menu.admin" icon={<AdminPanelSettings />}>
						{getMenuItems(resources.admin, 'admin')}
					</SubMenu>
				</>
			)}
		</CountContextProvider>
	</RaMenu>
)
