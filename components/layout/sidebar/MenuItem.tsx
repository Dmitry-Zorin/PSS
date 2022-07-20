import { HStack, ListItem, Square, Text, Tooltip } from '@chakra-ui/react'
import { useSidebarState } from 'components'
import { motion } from 'framer-motion'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
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
	const router = useRouter()
	const isActive = new RegExp(`${to}($|\/)`).test(router.asPath)

	return (
		<Tooltip
			label={text}
			placement="right"
			fontWeight="normal"
			hidden={isSidebarOpen}
		>
			<ListItem>
				<NextLink href={to} passHref>
					<HStack
						as={motion.a}
						outlineOffset={-1}
						h={10}
						spacing={2}
						color={isActive ? 'primary' : 'text-secondary'}
						_hover={{
							color: isActive ? 'primary' : 'inherit',
						}}
						initial={false}
						animate={{
							paddingLeft: indent ? '2.5rem' : 0,
							transition: gentleSpringConfig,
						}}
					>
						<Square size={10}>{icon}</Square>
						<Text
							as={motion.span}
							fontSize="0.95rem"
							fontWeight="medium"
							animate={{ opacity: isSidebarOpen ? 1 : 0 }}
						>
							{text}
						</Text>
					</HStack>
				</NextLink>
			</ListItem>
		</Tooltip>
	)
}
