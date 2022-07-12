import { MenuItem } from 'layout'
import { useResourceDefinitions } from 'react-admin'
import { MenuItemProps } from './MenuItem'

interface ResourceMenuItemProps extends Partial<MenuItemProps> {
	name: string
}

const ResourceMenuItem = ({ name, ...props }: ResourceMenuItemProps) => {
	const resource = useResourceDefinitions()[name]

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
