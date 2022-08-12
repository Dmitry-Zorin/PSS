import { Menu, MenuItem, MenuList } from '@chakra-ui/react'
import {
	faCog,
	faSignInAlt,
	faSignOutAlt,
	faUser,
} from '@fortawesome/free-solid-svg-icons'
import { Icon, MenuIconButton } from 'components'
import useTranslation from 'next-translate/useTranslation'

export default function UserMenu() {
	const { t } = useTranslation()
	return (
		<div>
			<Menu>
				<MenuIconButton
					aria-label={t('labels.user_menu')}
					icon={<Icon icon={faUser} boxSize={5} />}
				/>
				<MenuList>
					<MenuItem icon={<Icon icon={faCog} />}>Settings</MenuItem>
					<MenuItem icon={<Icon icon={faSignInAlt} />}>Sign In</MenuItem>
					<MenuItem icon={<Icon icon={faSignOutAlt} />}>Sign out</MenuItem>
				</MenuList>
			</Menu>
		</div>
	)
}
