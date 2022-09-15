import {
	Menu,
	MenuButton,
	MenuItemOption,
	MenuList,
	MenuOptionGroup,
} from '@chakra-ui/react'
import { faCheck, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { Button, Icon, Loading, MenuSearch } from 'components'
import useTranslation from 'next-translate/useTranslation'
import { Id } from 'validations/common'

interface SelectManyMenuProps<Item extends { id: Id }> {
	isLoading: boolean
	isPreviousData: boolean
	error: Error | null
	items?: Item[]
	selectedItems: Item[]
	buttonText?: string
	search: (value?: string) => void
	getText: (item: Item) => string
	onAdd: (id: Id) => void
	onRemove: (ids: Id[]) => void
}

export default function SelectManyMenu<Item extends { id: Id }>({
	isLoading,
	isPreviousData,
	error,
	items,
	selectedItems,
	search,
	getText,
	onAdd,
	onRemove,
}: SelectManyMenuProps<Item>) {
	const { t } = useTranslation('resources')

	return (
		<div>
			<Menu closeOnSelect={false} placement="bottom-start" flip={false}>
				<MenuButton
					as={Button}
					variant="outline"
					leftIcon={<Icon icon={faPlusCircle} />}
				>
					{t('common:actions.add')}
				</MenuButton>
				<MenuList
					maxH={96}
					maxW="calc(100vw - 2rem)"
					overflowY="auto"
					sx={{
						'::-webkit-scrollbar': {
							bg: 'transparent',
							w: 2,
						},
						'::-webkit-scrollbar-thumb': {
							bg: 'border',
							borderRadius: 'full',
						},
					}}
				>
					<MenuSearch search={search} isLoading={isPreviousData} />
					<Loading isLoading={isLoading}>
						{error
							? error.message
							: items && (
									<MenuOptionGroup
										type="checkbox"
										value={selectedItems.map(({ id }) => id.toString())}
										onChange={(ids) => {
											if (ids.length > selectedItems.length) {
												onAdd(+(ids as string[]).at(-1)!)
											} else {
												onRemove((ids as string[]).map((e) => +e))
											}
										}}
									>
										{items.map((item) => (
											<MenuItemOption
												key={item.id}
												value={item.id.toString()}
												icon={<Icon icon={faCheck} />}
											>
												{getText(item)}
											</MenuItemOption>
										))}
									</MenuOptionGroup>
							  )}
					</Loading>
				</MenuList>
			</Menu>
		</div>
	)
}
