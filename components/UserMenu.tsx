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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function UserMenu() {
	return (
		<div>
			<Menu>
				<MenuButton
					as={IconButton}
					icon={<FontAwesomeIcon icon={faUser} size="lg" />}
				/>
				<MenuList>
					<MenuItem icon={<FontAwesomeIcon icon={faCog} />}>Settings</MenuItem>
					<MenuItem icon={<FontAwesomeIcon icon={faSignInAlt} />}>
						Sign In
					</MenuItem>
					<MenuItem icon={<FontAwesomeIcon icon={faSignOutAlt} />}>
						Sign out
					</MenuItem>
				</MenuList>
			</Menu>
		</div>
	)
}
