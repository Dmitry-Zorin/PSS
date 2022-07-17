import {
	Avatar,
	HStack,
	Menu,
	MenuButton,
	MenuDivider,
	MenuItem,
	MenuList,
	Text,
} from '@chakra-ui/react'

export default function UserMenu() {
	return (
		<Menu>
			<MenuButton px={2}>
				<HStack spacing={2}>
					<Avatar size="sm" />
					<div>
						<Text fontSize="sm">Guest</Text>
						<Text fontSize="xs" color="gray.600">
							Guest
						</Text>
					</div>
				</HStack>
			</MenuButton>
			<MenuList color="text-secondary" bg="chakra-body-bg">
				<MenuItem>Profile</MenuItem>
				<MenuItem>Settings</MenuItem>
				<MenuDivider />
				<MenuItem>Sign out</MenuItem>
			</MenuList>
		</Menu>
	)
}
