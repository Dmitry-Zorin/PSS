import { SearchIcon } from '@chakra-ui/icons'
import {
	Input,
	InputGroup,
	InputLeftElement,
	InputProps,
} from '@chakra-ui/react'
import { useSearch } from 'hooks'
import { useTranslation } from 'next-i18next'

export default function Search(props: InputProps) {
	const { t } = useTranslation('fields')
	const { searchValue, search } = useSearch()

	return (
		<InputGroup w={60}>
			<InputLeftElement pointerEvents="none" color="gray.500">
				<SearchIcon />
			</InputLeftElement>
			<Input
				type="search"
				value={searchValue}
				onChange={search}
				variant="filled"
				placeholder={t('search')}
				_placeholder={{ color: 'gray.500' }}
				{...props}
			/>
		</InputGroup>
	)
}
