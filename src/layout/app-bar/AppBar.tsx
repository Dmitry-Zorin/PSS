import { HamburgerIcon } from '@chakra-ui/icons'
import {
	Box,
	Flex,
	IconButton,
	Tooltip,
	useColorModeValue,
	useDisclosure,
} from '@chakra-ui/react'
import Logo from '../../components/Logo'
import ColorModeSwitch from '../../components/ColorModeSwitch'
import UserMenu from './UserMenu'

export default function AppBar() {
	const { isOpen, onToggle } = useDisclosure()

	return (
		<Box>
			<Flex
				color={useColorModeValue('gray.600', 'white')}
				minH={15}
				py={{ base: 2 }}
				px={{ base: 4 }}
				borderBottom="1px"
				borderColor="chakra-border-color"
				align="center"
				justify="space-between"
			>
				<Flex>
					<Tooltip label="Sidebar" bg="blackAlpha.600">
						<IconButton
							aria-label="Toggle Sidebar"
							variant="ghost"
							icon={<HamburgerIcon w={5} h={5} />}
							onClick={onToggle}
						/>
					</Tooltip>
					<Logo />
				</Flex>
				<Flex>
					<ColorModeSwitch />
					<UserMenu />
				</Flex>
			</Flex>
		</Box>
	)
}
