import { List } from '@chakra-ui/react'
import { MenuItem, SubMenu } from 'components'
import { useTranslation } from 'next-i18next'

interface MenuItems {
	items: Record<string, any>
}

export default function Menu({ items }: MenuItems) {
	const { t } = useTranslation('menu')

	return (
		<List px={4} py={2}>
			{Object.entries(items).map(([name, info]) => {
				return info.icon ? (
					<MenuItem
						key={name}
						to={`/${name}`}
						text={t(name)}
						icon={info.icon}
					/>
				) : (
					<SubMenu key={name} text={t(name)} items={info} />
				)
			})}
		</List>
	)
}
