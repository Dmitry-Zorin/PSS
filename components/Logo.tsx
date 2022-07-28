import { Link, LinkProps } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import NextLink from 'next/link'

export default function Logo(props: LinkProps) {
	return (
		<NextLink href="/" passHref>
			<Link
				as={motion.a}
				fontSize={{
					base: 'xl',
					lg: '2xl',
				}}
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
