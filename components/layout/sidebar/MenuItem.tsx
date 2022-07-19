import { HStack, Link, ListItem, Text, Tooltip } from '@chakra-ui/react'
import { useSidebarState } from 'components'
import { motion } from 'framer-motion'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { cloneElement, ReactElement } from 'react'
import { gentleSpringConfig } from 'utils'
import { SIDEBAR_COLLAPSED_WIDTH } from '../Layout'

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
	const router = useRouter()
	const isActive = new RegExp(`${to}($|\/)`).test(router.asPath)

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
							h={10}
							pr={6}
							spacing={4}
							color={isActive ? 'primary' : 'text-secondary'}
							_hover={{
								color: isActive ? 'primary' : 'inherit',
							}}
							initial={false}
							animate={{
								paddingLeft: indent ? SIDEBAR_COLLAPSED_WIDTH : '1.5rem',
								transition: gentleSpringConfig,
							}}
						>
							{cloneElement(icon, { w: 6 })}
							<Text fontSize="0.95rem" fontWeight="medium">
								{text}
							</Text>
						</HStack>
					</Tooltip>
				</Link>
			</NextLink>
		</ListItem>
	)
}
