import { MenuGroup, MenuItem } from '@chakra-ui/react'
import { Icon } from 'components'
import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'
import { MainMenuGroupProps } from './MainMenuGroup'

export default function MainMenuGroupMobile({
	heading,
	info,
}: MainMenuGroupProps) {
	const { t } = useTranslation()
	return (
		<>
			<MenuGroup pt={heading && 1}>
				{heading && (
					<Link href={`/${heading}`} passHref>
						<MenuItem
							as="a"
							fontSize="sm-"
							fontWeight="semibold"
							letterSpacing="wide"
							mt={3}
							_hover={{
								bg: 'bg-layer-1',
							}}
						>
							{t(`layout.menu.items.${heading}`).toUpperCase()}
						</MenuItem>
					</Link>
				)}
				{Object.entries(info.items).map(([name, info]) => {
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
