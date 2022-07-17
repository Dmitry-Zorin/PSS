import { HStack, Link, ListItem, Text, Tooltip } from '@chakra-ui/react'
import { useSidebarState } from 'components'
import { motion } from 'framer-motion'
import NextLink from 'next/link'
import { cloneElement, ReactElement } from 'react'
import { gentleSpringConfig } from 'utils'

export interface MenuItemProps {
	to: string
	icon: ReactElement
	text: string
	indent?: boolean
}

export default function MenuItem({
	to,
	icon,
	text,
	indent = false,
}: MenuItemProps) {
	const [isSidebarOpen] = useSidebarState()

	return (
		<ListItem>
			<NextLink href={to} passHref>
				<Link _hover={{ textDecoration: 'none' }}>
					<Tooltip
						label={text}
						placement="right"
						fontWeight="normal"
						hidden={isSidebarOpen}
					>
						<HStack
							as={motion.div}
							pr={6}
							py={3}
							spacing={4}
							color="text-secondary"
							_hover={{ color: 'inherit' }}
							initial={false}
							animate={{
								paddingLeft: indent ? 68 : 24,
								transition: gentleSpringConfig,
							}}
						>
							{cloneElement(icon, { w: 6, color: 'green.200' })}
							<Text fontSize="md">{text}</Text>
						</HStack>
					</Tooltip>
				</Link>
			</NextLink>
		</ListItem>
	)
}