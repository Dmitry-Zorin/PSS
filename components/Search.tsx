import { CloseIcon, Search2Icon } from '@chakra-ui/icons'
import {
	Input,
	InputGroup,
	InputLeftElement,
	InputProps,
	InputRightElement,
} from '@chakra-ui/react'
import { useSearch } from 'hooks'
import { useTranslation } from 'next-i18next'

export default function Search(props: InputProps) {
	const { t } = useTranslation('fields')
	const { searchValue, search, clear } = useSearch()

	return (
		<InputGroup w={60}>
			<InputLeftElement pointerEvents="none" color="text-secondary">
				<Search2Icon />
			</InputLeftElement>
			<Input
				value={searchValue}
				onChange={search}
				variant="filled"
				placeholder={t('search')}
				_placeholder={{ color: 'text-secondary' }}
				{...props}
			/>
			{searchValue && (
				<InputRightElement
					cursor="pointer"
					color="text-secondary"
					onClick={clear}
				>
					<CloseIcon boxSize={3} />
				</InputRightElement>
			)}
		</InputGroup>
	)
}
