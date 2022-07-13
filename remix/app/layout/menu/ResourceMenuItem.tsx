import { Circle } from '@mui/icons-material'
import { MenuItem } from '~/layout'
import type { MenuItemProps } from './MenuItem'

interface ResourceMenuItemProps extends Partial<MenuItemProps> {
	name: string
}

const ResourceMenuItem = ({ name, ...props }: ResourceMenuItemProps) => {
	// const resource = useResourceDefinitions()[name]
	const resource = { icon: Circle }

	if (!resource) {
		return null
	}

	const { icon: Icon } = resource

	return (
		<MenuItem
			to={`/${name}`}
			icon={<Icon />}
			text={`resources.${name}.name`}
			{...props}
		/>
	)
}

export default ResourceMenuItem
