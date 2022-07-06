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

	return (
		<MenuItem
			to={`/${name}`}
			icon={<Icon />}
			text={`resources.${name}.name`}
			{...props}
		>
			{name in publications && (
				<MenuChip
					label={getResourceCount(name) || 0}
					sx={{ display: 'none' }}
				/>
			)}
		</MenuItem>
	)
}

export default ResourceMenuItem
