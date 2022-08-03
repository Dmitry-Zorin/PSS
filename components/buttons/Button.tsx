import {
	Box,
	Button as ChakraButton,
	ButtonProps,
	forwardRef,
} from '@chakra-ui/react'
import Tap from 'components/Tap'
import { useTap } from 'hooks'

const Button = forwardRef<ButtonProps, 'button'>(
	({ children, leftIcon, rightIcon, ...props }, ref) => {
		const { isTapped, listeners } = useTap()
		return (
			<ChakraButton ref={ref} {...listeners} {...props}>
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
	},
)

export default Button
