import { Box, Button as ChakraButton, ButtonProps } from '@chakra-ui/react'
import Tap from 'components/Tap'
import { useTap } from 'hooks'

export default function Button({
	children,
	leftIcon,
	rightIcon,
	...props
}: ButtonProps) {
	const { isTapped, listeners } = useTap()
	return (
		<ChakraButton {...listeners} {...props}>
			<Tap isTapped={isTapped} scale={0.95}>
				{leftIcon}
				<Box as="span" pl={leftIcon ? 2 : 0} pr={rightIcon ? 2 : 0}>
					{children}
				</Box>
				{rightIcon}
			</Tap>
		</ChakraButton>
	)
}
