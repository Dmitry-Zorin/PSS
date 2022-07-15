import { Info, Timeline } from '@mui/icons-material'
import { List } from '@mui/material'
// import type { Permissions } from '~/auth.provider'
import { MenuItem, SubMenu } from '~/layout'
import resources from '~/resources'

const Menu = () => {
	// const { permissions } = usePermissions<Permissions>()

	const getMenuItems = (resources: Record<string, any>) => {
		return Object.keys(resources).map((e) => (
			<MenuItem to={`/${e}`} icon={resources[e].icon} text={e} />
		))
	}

	return (
		<List disablePadding sx={{ pt: 1, pl: 1 }}>
			<MenuItem to="/about" icon={<Info />} text="about" />
			<MenuItem to="/timeline" icon={<Timeline />} text="timeline" />
			{getMenuItems(resources.main)}
			<SubMenu name="menu.groups.publications">
				{getMenuItems(resources.publications)}
			</SubMenu>
			{/* {permissions?.isAdmin && (
				<SubMenu name="menu.groups.admin">
					{getMenuItems(resources.admin)}
				</SubMenu>
			)} */}
		</List>
	)
}

export default Menu
