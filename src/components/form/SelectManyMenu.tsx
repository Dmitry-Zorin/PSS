import {
	Box,
	Button,
	Input,
	InputGroup,
	InputLeftElement,
	Menu,
	MenuButton,
	MenuItemOption,
	MenuList,
	MenuOptionGroup,
} from '@chakra-ui/react'
import { faCirclePlus, faSearch } from '@fortawesome/free-solid-svg-icons'
import { Icon } from 'components'
import useTranslation from 'next-translate/useTranslation'
import { useState } from 'react'
import { Id } from 'validations/common'

interface SelectManyMenuProps<Item extends { id: Id }> {
	error?: Error | null
	items?: Item[]
	selectedItems: Item[]
	search: (value?: string) => void
	getText: (item: Item) => string
	onAdd: (id: Id) => void
	onRemove: (ids: Id[]) => void
}

export default function SelectManyMenu<Item extends { id: Id }>({
	error,
	items,
	selectedItems,
	search,
	getText,
	onAdd,
	onRemove,
}: SelectManyMenuProps<Item>) {
	const { t } = useTranslation('resources')
	const [value, setValue] = useState('')

	return (
		<div>
			<Menu closeOnSelect={false}>
				<MenuButton
					as={Button}
					leftIcon={<Icon icon={faCirclePlus} boxSize={5} />}
				>
					{/* {t('common:actions.add')} */}
					Выбрать авторов
				</MenuButton>
				<MenuList>
					<Box px={1} pb={2}>
						<InputGroup>
							<InputLeftElement>
								<Icon icon={faSearch} />
							</InputLeftElement>
							<Input
								value={value}
								placeholder={t('common:actions.search')}
								onChange={(e) => setValue(e.target.value)}
								onKeyDown={(e) => {
									if (e.key === 'Enter') {
										e.preventDefault()
										search(value || undefined)
									}
								}}
							/>
						</InputGroup>
					</Box>
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
										<MenuItemOption key={item.id} value={item.id.toString()}>
											{getText(item)}
										</MenuItemOption>
									))}
								</MenuOptionGroup>
						  )}
				</MenuList>
			</Menu>
		</div>
	)
}
