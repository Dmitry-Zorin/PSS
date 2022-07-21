import { List } from '@chakra-ui/react'
import { MenuItem, SubMenu } from 'components'

interface MenuItems {
	items: Record<string, any>
}

export default function Menu({ items }: MenuItems) {
	return (
		<List px={4} py={2}>
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
