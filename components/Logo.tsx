import { Link, LinkProps } from '@chakra-ui/react'
import NextLink from 'next/link'

export default function Logo(props: LinkProps) {
	return (
		<NextLink href="/" passHref>
			<Link
				fontSize="2xl"
				fontWeight="bold"
				color="primary"
				borderRadius="md"
				lineHeight="none"
				p={2}
				_hover={{ textDecoration: 'none' }}
				{...props}
			>
				PSS
			</Link>
		</NextLink>
	)
}
