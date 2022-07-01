import { CountContext } from 'contexts'
import { MenuChip, MenuItem } from 'layout'
import { useContext } from 'react'
import { useResourceDefinitions } from 'react-admin'
import resources from 'resources'
import { MenuItemProps } from './MenuItem'

const { publications } = resources

interface ResourceMenuItemProps extends Partial<MenuItemProps> {
	name: string
}

const ResourceMenuItem = ({ name, ...props }: ResourceMenuItemProps) => {
	const { getResourceCount } = useContext(CountContext)
	const resource = useResourceDefinitions()[name]

	if (!resource) {
		return null
	}

	const { icon: Icon } = resource

	const isPublication = name in publications
	const count = getResourceCount(name) || 0

	return (
		<MenuItem
			to={`/${name}`}
			icon={<Icon />}
			text={`resources.${name}.name`}
			{...props}
		>
			{isPublication && <MenuChip label={count} />}
		</MenuItem>
	)
}

export default ResourceMenuItem
