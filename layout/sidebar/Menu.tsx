import { InfoIcon } from '@chakra-ui/icons'
import { List } from '@chakra-ui/react'
import { MenuItem, SubMenu } from 'layout'
import { useTranslation } from 'next-i18next'

interface MenuItems {
	items: Record<string, any>
}

export default function Menu({ items }: MenuItems) {
	const { t } = useTranslation('menu')

	return (
		<List pt={2}>
			{Object.entries(items).map(([name, info]) => {
				return typeof info === 'boolean' ? (
					<MenuItem
						key={name}
						to={`/${name}`}
						text={t(name)}
						icon={<InfoIcon />}
					/>
				) : (
					<SubMenu key={name} text={t(name)} items={info} />
				)
			})}
		</List>
	)
}
