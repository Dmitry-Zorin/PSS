import { HStack, List, Text } from '@chakra-ui/react'
import { faCircleMinus } from '@fortawesome/free-solid-svg-icons'
import { Icon, IconButton } from 'components'
import { AnimatePresence, motion } from 'framer-motion'
import { useIsFirstRender } from 'hooks'
import useTranslation from 'next-translate/useTranslation'
import { Attributes } from 'react'
import { stiffSpringConfig } from 'utils/animation'

interface SelectedItemsListProps<Item> {
	items: Item[]
	getKey: (item: Item) => Attributes['key']
	getText: (item: Item) => string
	onRemove: (item: Item) => void
}

export default function SelectedItemsList<Item>({
	items,
	getKey,
	getText,
	onRemove,
}: SelectedItemsListProps<Item>) {
	const { t } = useTranslation('resources')
	const showAnimation = !useIsFirstRender()

	return (
		<List flexGrow={1}>
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
