import { HStack, List, ListItem, Text } from '@chakra-ui/react'
import { faCircleMinus } from '@fortawesome/free-solid-svg-icons'
import { Icon, IconButton } from 'components'
import { AnimatePresence, motion } from 'framer-motion'
import { useIsFirstRender } from 'hooks'
import useTranslation from 'next-translate/useTranslation'
import { Attributes, ReactNode } from 'react'
import { stiffSpringConfig } from 'utils/animation'

interface SelectedItemsListProps<Item> {
	items: Item[]
	placeholder: ReactNode
	getKey: (item: Item) => Attributes['key']
	getText: (item: Item) => string
	onRemove: (item: Item) => void
}

export default function SelectedItemsList<Item>({
	items,
	placeholder,
	getKey,
	getText,
	onRemove,
}: SelectedItemsListProps<Item>) {
	const { t } = useTranslation('resources')
	const showAnimation = !useIsFirstRender()

	return (
		<List flexGrow={1}>
			{!items.length && (
				<ListItem h={0} color="text-secondary">
					<Text lineHeight={10}>{placeholder}</Text>
				</ListItem>
			)}
			<AnimatePresence>
				{items.map((item) => (
					<motion.li
						key={getKey(item)}
						initial={showAnimation ? { height: 0, opacity: 0 } : false}
						animate={{ height: 'auto', opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{
							height: stiffSpringConfig,
							opacity: { duration: 0.1 },
						}}
					>
						<HStack>
							<IconButton
								aria-label={t('common:actions.remove')}
								icon={<Icon icon={faCircleMinus} />}
								onClick={() => onRemove(item)}
							/>
							<Text>{getText(item)}</Text>
						</HStack>
					</motion.li>
				))}
			</AnimatePresence>
		</List>
	)
}
