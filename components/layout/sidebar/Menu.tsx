import { List, ListProps } from '@chakra-ui/react'
import { MenuItem, SubMenu } from 'components'

interface MenuItems extends ListProps {
	items: Record<string, any>
}

export default function Menu({ items, ...props }: MenuItems) {
	return (
		<List p={4} {...props}>
			{Object.entries(items).map(([name, info]) => {
				return info.icon ? (
					<MenuItem key={name} to={`/${name}`} text={name} icon={info.icon} />
				) : (
					<SubMenu key={name} text={name} items={info} />
				)
			})}
		</List>
	)
}
