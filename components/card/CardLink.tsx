import { StackProps } from '@chakra-ui/react'
import Link, { LinkProps } from 'next/link'
import Card from './Card'

export default function CardLink({
	href,
	...props
}: Pick<LinkProps, 'href'> & StackProps) {
	return (
		<Link href={href} passHref>
			<Card
				as="a"
				// cursor="pointer"
				_hover={{ bg: 'bg-100' }}
				transitionProperty="background"
				transitionDuration="fast"
				transitionTimingFunction="ease-out"
				{...props}
			/>
		</Link>
	)
}
