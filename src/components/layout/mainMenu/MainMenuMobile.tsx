import { Box, HStack, Menu, MenuList } from '@chakra-ui/react'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { Icon, Logo, MainMenuGroupMobile, MenuIconButton } from 'components'
import { ResourceKey } from 'constants/resources'
import useTranslation from 'next-translate/useTranslation'
import { MainMenuProps } from './MainMenu'

export default function MainMenuMobile({ items }: MainMenuProps) {
	const { t } = useTranslation()

	return (
		<Box display={{ md: 'none' }}>
			<Menu>
				<HStack>
					<MenuIconButton
						aria-label={t('layout.appBar.mainMenu.label')}
						icon={<Icon icon={faBars} boxSize={5} />}
					/>
					<Logo p={1} />
				</HStack>
				<MenuList>
					{Object.entries(items).map(([name, info]) => {
						return (
							<MainMenuGroupMobile
								key={name}
								heading={name === 'main' ? undefined : (name as ResourceKey)}
								info={info}
							/>
						)
					})}
				</MenuList>
			</Menu>
		</Box>
	)
}
