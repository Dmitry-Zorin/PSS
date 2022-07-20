import { ChevronDownIcon } from '@chakra-ui/icons'
import {
	Box,
	Flex,
	HStack,
	ListItem,
	ListItemProps,
	Square,
	Text,
	Tooltip,
} from '@chakra-ui/react'
import { useSidebarState } from 'components'
import { motion } from 'framer-motion'
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
	const [isSidebarOpen] = useSidebarState()

	return (
		<Tooltip
			label={text}
			placement="right"
			fontWeight="normal"
			hidden={isSidebarOpen}
		>
			<ListItem cursor="pointer" userSelect="none" {...props}>
				<HStack as="button" w="full" h={10} spacing={2} color="text-secondary">
					<Square size={10}>
						<Flex
							as={motion.div}
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
						color="secondary"
						fontSize="sm"
						fontWeight="semibold"
						animate={{ opacity: isSidebarOpen ? 1 : 0 }}
					>
						{text.toUpperCase()}
					</Text>
				</HStack>
			</ListItem>
		</Tooltip>
	)
}
