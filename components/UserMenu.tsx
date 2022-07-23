import {
	Box,
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
		<Box>
			<Menu>
				<MenuButton
					as={IconButton}
					variant="unstyled"
					icon={<FontAwesomeIcon icon={faUser} size="lg" />}
					p={2}
					borderRadius="lg"
				/>
				<MenuList>
					<MenuItem>Settings</MenuItem>
					<MenuItem>Sign out</MenuItem>
				</MenuList>
			</Menu>
		</Box>
	)
}
