import { ButtonProps } from '@chakra-ui/react'
import { Button } from 'components'
import Link from 'next/link'

export interface CoolButtonLinkProps extends ButtonProps {
	to: string
}

export default function CoolButtonLink({ to, ...props }: CoolButtonLinkProps) {
	return (
		<Link href={to}>
			<Button
				fontSize="xl"
				fontWeight="medium"
				rounded="full"
				variant="solid"
				px={9}
				py={7}
				{...props}
			/>
		</Link>
	)
}
