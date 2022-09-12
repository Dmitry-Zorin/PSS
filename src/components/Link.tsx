import {
	Link as ChakraLink,
	LinkProps as ChakraLinkProps,
} from '@chakra-ui/react'
import NextLink, { LinkProps as NextLinkProps } from 'next/link'

interface LinkProps extends Omit<ChakraLinkProps, 'href'> {
	href: NextLinkProps['href']
}

export default function Link({ children, href, ...props }: LinkProps) {
	return (
		<NextLink href={href} passHref>
			<ChakraLink _hover={{ color: 'primary' }} {...props}>
				{children}
			</ChakraLink>
		</NextLink>
	)
}
