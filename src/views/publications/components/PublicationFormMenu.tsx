import {
	Button,
	Input,
	InputGroup,
	InputRightElement,
	Menu,
	MenuButton,
	MenuItemOption,
	MenuList,
	MenuOptionGroup,
} from '@chakra-ui/react'
import {
	faAngleDown,
	faCaretDown,
	faCheck,
	faChevronDown,
} from '@fortawesome/free-solid-svg-icons'
import { Icon } from 'components'
import { useController, useFormContext } from 'react-hook-form'
import { GetPublicationResponse } from 'server/services/publication'

export default function PublicationFormMenu() {
	const { control } = useFormContext<GetPublicationResponse>()

	const {
		field: { value, onChange },
	} = useController({
		name: 'publicationForm',
		control,
	})

	return (
		<Menu>
			<MenuButton
				as={Button}
				role="group"
				w="full"
				p={0}
				_hover={{ color: 'text-secondary' }}
			>
				<InputGroup>
					<Input
						value={value}
						readOnly
						_groupHover={{ borderColor: 'text-secondary' }}
					/>
					<InputRightElement>
						<Icon icon={faCaretDown} />
					</InputRightElement>
				</InputGroup>
			</MenuButton>
			<MenuList>
				<MenuOptionGroup type="radio" value={value}>
					<MenuItemOption
						value="Печатная"
						icon={<Icon icon={faCheck} />}
						onClick={() => onChange('Печатная')}
					>
						Печатная
					</MenuItemOption>
					<MenuItemOption
						value="Электронная"
						icon={<Icon icon={faCheck} />}
						onClick={() => onChange('Электронная')}
					>
						Электронная
					</MenuItemOption>
				</MenuOptionGroup>
			</MenuList>
		</Menu>
	)
}
