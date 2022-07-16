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
				bgGradient={`linear(${angle}deg, ${colors.join(', ')})`}
				_hover={{ opacity: 0.9 }}
				_active={{ opacity: 0.8 }}
				{...props}
			/>
		</Link>
	)
}
