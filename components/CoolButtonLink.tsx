import { Button, ButtonProps } from '@chakra-ui/react'
import Link from 'next/link'

export interface CoolButtonLinkProps extends ButtonProps {
	to: string
}

export default function CoolButtonLink({ to, ...props }: CoolButtonLinkProps) {
	return (
		<Link href={to}>
			<Button
				fontSize="xl"
				fontWeight="normal"
				color="white"
				rounded="full"
				bgGradient="linear(50deg, blue.500, purple.400)"
				_hover={{
					bgGradient: 'linear(50deg, blue.600, purple.500)',
				}}
				px={9}
				py={7}
				{...props}
			/>
		</Link>
	)
}
