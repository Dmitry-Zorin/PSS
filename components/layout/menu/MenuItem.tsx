import { Circle, HStack, Icon, ListItem, Text, Tooltip } from '@chakra-ui/react'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion } from 'framer-motion'
import { useSidebarState } from 'hooks'
import { useTranslation } from 'next-i18next'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { gentleSpringConfig } from 'utils'

export interface MenuItemProps {
	to: string
	icon: IconProp
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
	const isActive = new RegExp(`^${to}($|\/)`).test(router.asPath)
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
						h={10}
						spacing={2}
						borderRadius="full"
						color={isActive ? 'primary' : 'text-secondary'}
						outline="2px solid transparent"
						_hover={{ color: isActive ? 'primary' : 'text' }}
						_focusVisible={{ shadow: 'outline' }}
						initial={false}
						animate={{
							paddingLeft: isSidebarOpen ? indent : 0,
							transition: gentleSpringConfig,
						}}
					>
						<Circle size={10}>
							<Icon as={FontAwesomeIcon} icon={icon} />
						</Circle>
						<Text
							as={motion.span}
							flexShrink={0}
							fontSize="md"
							initial={false}
							animate={{ opacity: +isSidebarOpen }}
						>
							{t(text)}
						</Text>
					</HStack>
				</NextLink>
			</ListItem>
		</Tooltip>
	)
}
