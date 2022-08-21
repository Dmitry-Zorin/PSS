import { MenuDivider, MenuGroup, MenuItem } from '@chakra-ui/react'
import { Icon } from 'components'
import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'
import { MainMenuGroupProps } from './MainMenuGroup'

export default function MainMenuGroupMobile({
	heading,
	items,
}: MainMenuGroupProps) {
	const { t } = useTranslation()
	return (
		<>
			{heading && <MenuDivider mt={3} />}
			<MenuGroup
				title={heading && t(`layout.menu.items.${heading}`)}
				pt={heading && 1}
			>
				{Object.entries(items).map(([name, info]) => {
					return (
						<Link
							key={name}
							href={`${heading ? `/${heading.toLowerCase()}` : ''}/${name}`}
							passHref
						>
							<MenuItem as="a" icon={<Icon icon={info.icon} boxSize={4} />}>
								{t(`layout.menu.items.${name}`)}
							</MenuItem>
						</Link>
					)
				})}
			</MenuGroup>
		</>
	)
}
