import { HStack, StackProps } from '@chakra-ui/react'
import { ColorModeSwitch, UserMenu } from 'components'

export default function AppBar(props: StackProps) {
	return (
		<HStack justify="flex-end" p={4} {...props}>
			<ColorModeSwitch />
			<UserMenu />
		</HStack>
	)
}
