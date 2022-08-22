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

interface SelectOneMenuProps<Item extends { id: Id }> {
	error?: Error | null
	items?: Item[]
	selectedItem: Item
	search: (value?: string) => void
	getText: (item: Item) => string
	onSelect: (id: Id) => void
}

export default function SelectOneMenu<Item extends { id: Id }>({
	error,
	items,
	selectedItem,
	search,
	getText,
	onSelect,
}: SelectOneMenuProps<Item>) {
	const { t } = useTranslation('resources')
	const [value, setValue] = useState('')

	return (
		<div>
			<Menu>
				<MenuButton
					as={Button}
					leftIcon={<Icon icon={faCirclePlus} boxSize={5} />}
				>
					{t('common:actions.add')}
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
									type="radio"
									value={selectedItem.id.toString()}
									onChange={(id) => onSelect(+id)}
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
