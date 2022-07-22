import { Circle, HStack, ListItem, Text, Tooltip } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useSidebarState } from 'hooks'
import { useTranslation } from 'next-i18next'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import { gentleSpringConfig } from 'utils'

export interface MenuItemProps {
	to: string
	icon: ReactElement
	text: string
	indent?: string | number
}

export default function MenuItem({
	to,
	icon,
	text,
	indent = 0,
}: MenuItemProps) {
	const [isSidebarOpen] = useSidebarState()
	const router = useRouter()
	const isActive = new RegExp(`${to}($|\/)`).test(router.asPath)
	const { t } = useTranslation('common', { keyPrefix: 'menu.items' })

	return (
		<Tooltip
			label={t(text)}
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
						pr={4}
						bg={isActive ? 'bg-100' : 'transparent'}
						color={isActive ? 'primary' : 'text-secondary'}
						_hover={{
							bg: isActive ? 'bg-100' : 'bg-50',
							color: isActive ? 'primary' : 'text',
						}}
						borderRadius="full"
						initial={false}
						animate={{
							paddingLeft: isSidebarOpen ? indent : 0,
							transition: gentleSpringConfig,
						}}
					>
						<Circle size={10}>{icon}</Circle>
						<Text
							as={motion.span}
							fontSize="md"
							initial={false}
							animate={{ opacity: isSidebarOpen ? 1 : 0 }}
						>
							{t(text)}
						</Text>
					</HStack>
				</NextLink>
			</ListItem>
		</Tooltip>
	)
}
