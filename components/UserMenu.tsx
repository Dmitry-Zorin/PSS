import {
	Avatar,
	Box,
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
		<Box>
			<Menu>
				<MenuButton p={2}>
					<HStack spacing={2}>
						<Avatar size="sm" bg="slate.500" />
						<div>
							<Text fontSize="sm" color="text">
								Guest
							</Text>
							<Text fontSize="xs">Guest</Text>
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
		</Box>
	)
}
