import {
	IconButton,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
} from '@chakra-ui/react'
import {
	faCog,
	faSignInAlt,
	faSignOutAlt,
	faUser,
} from '@fortawesome/free-solid-svg-icons'
import { Icon } from 'components'

export default function UserMenu() {
	return (
		<div>
			<Menu>
				<MenuButton
					as={IconButton}
					aria-label="User Menu"
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
