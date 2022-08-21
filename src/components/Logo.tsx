import { Link, LinkProps } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import NextLink from 'next/link'

export default function Logo(props: LinkProps) {
	return (
		<NextLink href="/" passHref>
			<Link
				as={motion.a}
				fontSize={{
					base: '2xl',
					md: 'xl',
					lg: '2xl',
				}}
				fontWeight="bold"
				color="primary"
				borderRadius="md"
				lineHeight="none"
				p={2}
				_hover={{ textDecoration: 'none' }}
				_focusVisible={{
					shadow: '0 0 0 2px var(--chakra-colors-primary)',
				}}
				{...props}
			>
				PSS
			</Link>
		</NextLink>
	)
}
