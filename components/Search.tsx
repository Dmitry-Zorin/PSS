import { SearchIcon } from '@chakra-ui/icons'
import {
	Input,
	InputGroup,
	InputLeftElement,
	InputProps,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'

export default function Search(props: InputProps) {
	const { t } = useTranslation('fields')

	return (
		<InputGroup w={60}>
			<InputLeftElement pointerEvents="none" color="gray.500">
				<SearchIcon />
			</InputLeftElement>
			<Input
				type="search"
				variant="filled"
				placeholder={t('search')}
				_placeholder={{ color: 'gray.500' }}
				{...props}
			/>
		</InputGroup>
	)
}
