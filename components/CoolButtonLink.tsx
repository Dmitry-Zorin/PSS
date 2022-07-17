import { Button, ButtonProps } from '@chakra-ui/react'
import Link from 'next/link'

export interface CoolButtonLinkProps extends ButtonProps {
	to: string
	colors: string[]
	angle?: number
}

export default function CoolButtonLink({
	to,
	colors,
	angle = 50,
	...props
}: CoolButtonLinkProps) {
	return (
		<Link href={to}>
			<Button
				fontSize="xl"
				fontWeight="medium"
				rounded="full"
				variant="solid"
				px={9}
				py={7}
				shadow="-3px 2px 15px -5px rgb(144 211 145 / 50%), 3px -2px 15px -5px rgb(183 148 244 / 50%)"
				bgGradient={`linear(${angle}deg, ${colors.join(', ')})`}
				_hover={{
					opacity: 0.9,
					shadow:
						'-3px 2px 15px -5px rgb(144 211 145 / 25%), 3px -2px 15px -5px rgb(183 148 244 / 25%)',
				}}
				_active={{
					opacity: 0.8,
					shadow: 'none',
				}}
				{...props}
			/>
		</Link>
	)
}
