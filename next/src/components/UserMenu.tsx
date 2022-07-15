import {
	Avatar,
	HStack,
	Menu,
	MenuButton,
	MenuDivider,
	MenuItem,
	MenuList,
	Stack,
	Text,
} from '@chakra-ui/react'

export default function UserMenu() {
	return (
		<Menu>
			<MenuButton p={2}>
				<HStack spacing={2}>
					<Avatar size="sm" />
					<Stack spacing="1px">
						<Text fontSize="sm">Guest</Text>
						<Text fontSize="xs" color="gray.600">
							Guest
						</Text>
					</Stack>
				</HStack>
			</MenuButton>
			<MenuList bg="chakra-body-bg" color="chakra-body-text">
				<MenuItem>Profile</MenuItem>
				<MenuItem>Settings</MenuItem>
				<MenuItem>Billing</MenuItem>
				<MenuDivider />
				<MenuItem>Sign out</MenuItem>
			</MenuList>
		</Menu>
	)
}
