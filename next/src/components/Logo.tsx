import { Link, Text } from '@chakra-ui/react'
import NextLink from 'next/link'

const Logo = () => (
	<NextLink href="/" passHref>
		<Link _hover={{ textDecoration: 'none' }}>
			<Text as="span" fontSize="2xl" fontWeight={700} color="pink.500" px={2}>
				PSS
			</Text>
		</Link>
	</NextLink>
)

export default Logo
