import { HStack, Link, ListItem, Text, Tooltip } from '@chakra-ui/react'
import NextLink from 'next/link'
import { ReactElement } from 'react'

export interface MenuItemProps {
	to: string
	icon: ReactElement
	text: string
}

export default function MenuItem({ to, icon, text }: MenuItemProps) {
	return (
		<ListItem>
			<NextLink href={to} passHref>
				<Link _hover={{ textDecoration: 'none' }}>
					<Tooltip label={text} placement="right" fontWeight="normal">
						<HStack px={7} py={2} spacing={4}>
							<div>{icon}</div>
							<Text fontSize="md" color="gray.300">
								{text}
							</Text>
						</HStack>
					</Tooltip>
				</Link>
			</NextLink>
		</ListItem>
	)
}
