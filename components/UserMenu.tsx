import {
	IconButton,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
} from '@chakra-ui/react'
import { faUser } from '@fortawesome/free-solid-svg-icons'
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
					<MenuItem>Settings</MenuItem>
					<MenuItem>Sign out</MenuItem>
				</MenuList>
			</Menu>
		</div>
	)
}
