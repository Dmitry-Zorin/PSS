import { ChevronDownIcon } from '@chakra-ui/icons'
import {
	Flex,
	HStack,
	ListItem,
	ListItemProps,
	Square,
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
					color="text-secondary"
					borderRadius="full"
				>
					<Square size={10}>
						<Flex
							as={motion.div}
							initial={false}
							animate={{
								rotate: open ? 0 : -90,
								transition: gentleSpringConfig,
							}}
						>
							<ChevronDownIcon boxSize={6} />
						</Flex>
					</Square>
					<Text
						as={motion.span}
						fontSize="sm"
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
