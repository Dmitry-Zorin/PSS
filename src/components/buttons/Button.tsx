import {
	Box,
	Button as ChakraButton,
	ButtonProps as ChakraButtonProps,
	forwardRef,
} from '@chakra-ui/react'
import Tap from 'components/Tap'
import { useTap } from 'hooks'
import { isString } from 'lodash'
import Link, { LinkProps } from 'next/link'

export interface ButtonProps extends ChakraButtonProps {
	href?: LinkProps['href']
}

const Button = forwardRef<ButtonProps, 'button'>(
	({ children, href, leftIcon, rightIcon, ...props }, ref) => {
		const { isTapped, listeners } = useTap()
		const button = (
			<ChakraButton
				ref={ref}
				as={href ? 'a' : 'button'}
				{...listeners}
				{...props}
			>
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

		return href ? (
			<Link
				href={href}
				as={isString(href) ? href : href.pathname ?? undefined}
				passHref
			>
				{button}
			</Link>
		) : (
			button
		)
	},
)

export default Button
