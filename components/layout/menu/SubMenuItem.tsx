import { ChevronDownIcon } from '@chakra-ui/icons'
import {
	Circle,
	HStack,
	ListItem,
	ListItemProps,
	Text,
	Tooltip,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useSidebarState } from 'hooks'
import { useTranslation } from 'next-i18next'
import { gentleSpringConfig } from 'utils'

export interface SubMenuItemProps extends ListItemProps {
	text: string
	open: boolean
}

export default function SubMenuItem({
	text,
	open,
	...props
}: SubMenuItemProps) {
	const { t } = useTranslation('common', { keyPrefix: 'menu.groups' })
	const [isSidebarOpen] = useSidebarState()

	return (
		<Tooltip
			label={t(text)}
			placement="right"
			fontWeight="normal"
			hidden={isSidebarOpen}
		>
			<ListItem cursor="pointer" userSelect="none" {...props}>
				<HStack
					as="button"
					w="full"
					h={10}
					spacing={2}
					borderRadius="full"
					color="text-secondary"
					outline="2px solid transparent"
					_hover={{ color: 'text' }}
					_focusVisible={{ shadow: 'outline' }}
				>
					<Circle
						as={motion.div}
						size={10}
						initial={false}
						animate={{
							rotate: open ? 0 : -90,
							transition: gentleSpringConfig,
						}}
					>
						<ChevronDownIcon boxSize={6} />
					</Circle>
					<Text
						as={motion.span}
						fontSize="sm"
						flexShrink={0}
						initial={false}
						animate={{ opacity: isSidebarOpen ? 1 : 0 }}
					>
						{t(text).toUpperCase()}
					</Text>
				</HStack>
			</ListItem>
		</Tooltip>
	)
}
