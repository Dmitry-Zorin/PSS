import { Link, Text, TextProps } from '@chakra-ui/react'
import NextLink from 'next/link'

export default function Logo(props: TextProps) {
	return (
		<NextLink href="/" passHref>
			<Link _hover={{ textDecoration: 'none' }}>
				<Text
					as="span"
					fontSize="2xl"
					fontWeight="bold"
					color="primary"
					px={2}
					py={1}
					{...props}
				>
					PSS
				</Text>
			</Link>
		</NextLink>
	)
}
