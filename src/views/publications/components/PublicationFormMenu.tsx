import {
	Button,
	Input,
	Menu,
	MenuButton,
	MenuItemOption,
	MenuList,
	MenuOptionGroup,
} from '@chakra-ui/react'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
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
			<MenuButton as={Button} w="full" p={0}>
				<Input value={value ?? ''} readOnly />
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
