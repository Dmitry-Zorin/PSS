import { Menu, MenuGroup, MenuItem, MenuList } from '@chakra-ui/react'
import {
	faSignInAlt,
	faSignOutAlt,
	faUserCircle,
	faUserPlus,
} from '@fortawesome/free-solid-svg-icons'
import { Icon, MenuIconButton } from 'components'
import useTranslation from 'next-translate/useTranslation'

export default function UserMenu() {
	const { t } = useTranslation()
	return (
		<div>
			<Menu>
				<MenuIconButton
					aria-label={t('layout.appBar.userMenu.label')}
					icon={<Icon icon={faUserCircle} boxSize={5} />}
				/>
				<MenuList>
					<MenuGroup title={t('layout.appBar.userMenu.title')}>
						<MenuItem icon={<Icon icon={faUserPlus} />}>
							{t('layout.appBar.userMenu.items.register')}
						</MenuItem>
						<MenuItem icon={<Icon icon={faSignInAlt} />}>
							{t('layout.appBar.userMenu.items.signIn')}
						</MenuItem>
						<MenuItem icon={<Icon icon={faSignOutAlt} />}>
							{t('layout.appBar.userMenu.items.signOut')}
						</MenuItem>
					</MenuGroup>
				</MenuList>
			</Menu>
		</div>
	)
}
