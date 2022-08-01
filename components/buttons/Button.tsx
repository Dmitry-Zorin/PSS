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
			<Tap isTapped={isTapped}>
				{leftIcon && (
					<Box as="span" lineHeight={2} mr={2}>
						{leftIcon}
					</Box>
				)}
				{children}
				{rightIcon && (
					<Box as="span" ml={2}>
						{rightIcon}
					</Box>
				)}
			</Tap>
		</ChakraButton>
	)
}
