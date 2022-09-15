import { HStack, List, Text } from '@chakra-ui/react'
import { faCircleMinus, faUpDown } from '@fortawesome/free-solid-svg-icons'
import { Icon, IconButton, ReorderItem } from 'components'
import { AnimatePresence, Reorder } from 'framer-motion'
import { useIsFirstRender } from 'hooks'
import useTranslation from 'next-translate/useTranslation'
import { Attributes, useRef } from 'react'
import { stiffSpringConfig } from 'utils/animation'

interface SelectedItemsListProps<Item> {
	items: Item[]
	getKey: (item: Item) => Attributes['key']
	getText: (item: Item) => string
	onRemove: (item: Item) => void
	onReorder: (items: Item[]) => void
}

export default function SelectedItemsList<Item>({
	items,
	getKey,
	getText,
	onRemove,
	onReorder,
}: SelectedItemsListProps<Item>) {
	const { t } = useTranslation('resources')
	const showAnimation = !useIsFirstRender()
	const constraintsRef = useRef(null)

	return (
		<List
			as={Reorder.Group}
			ref={constraintsRef}
			values={items}
			onReorder={onReorder}
			flexGrow={1}
		>
			<AnimatePresence>
				{items.map((item) => (
					<ReorderItem
						key={getKey(item)}
						value={item}
						dragConstraints={constraintsRef}
						initial={showAnimation ? { height: 0, opacity: 0 } : false}
						animate={{ height: 'auto', opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{
							height: stiffSpringConfig,
							opacity: { duration: 0.1 },
						}}
					>
						{({ dragControls, isActive }) => (
							<HStack spacing={0}>
								<IconButton
									aria-label={t('common:actions.remove')}
									icon={<Icon icon={faCircleMinus} />}
									onClick={() => onRemove(item)}
								/>
								<IconButton
									aria-label={t('common:actions.reorder')}
									icon={<Icon icon={faUpDown} />}
									tabIndex={-1}
									bg={isActive ? 'bg-layer-1 !important' : undefined}
									cursor={isActive ? 'grabbing' : 'grab'}
									_active={{ cursor: 'grabbing' }}
									onPointerDown={(e) => dragControls.start(e)}
								/>
								<Text px={2}>{getText(item)}</Text>
							</HStack>
						)}
					</ReorderItem>
				))}
			</AnimatePresence>
		</List>
	)
}
