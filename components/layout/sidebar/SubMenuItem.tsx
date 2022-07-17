import { ChevronDownIcon } from '@chakra-ui/icons'
import {
	Box,
	HStack,
	ListItem,
	ListItemProps,
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
		<ListItem cursor="pointer" userSelect="none" {...props}>
			<Tooltip
				label={text}
				placement="right"
				fontWeight="normal"
				hidden={isSidebarOpen}
			>
				<HStack h={10} px={6} spacing={4} color="text-secondary">
					<Box
						as={motion.span}
						minW={6}
						initial={false}
						animate={{
							rotate: open ? 0 : -90,
							transition: gentleSpringConfig,
						}}
					>
						<ChevronDownIcon boxSize={6} />
					</Box>
					<Text color="orange.200" fontSize="sm" fontWeight="medium">
						{text.toUpperCase()}
					</Text>
				</HStack>
			</Tooltip>
		</ListItem>
	)
}
