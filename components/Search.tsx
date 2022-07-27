import { Search2Icon } from '@chakra-ui/icons'
import {
	Input,
	InputGroup,
	InputLeftElement,
	InputProps,
	InputRightElement,
} from '@chakra-ui/react'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'

interface SearchProps extends Omit<InputProps, 'onChange'> {
	onChange: (search: string) => void
}

export default function Search({ onChange, ...props }: SearchProps) {
	const { t } = useTranslation('fields')
	const [value, setValue] = useState('')

	useEffect(() => {
		onChange(value.trim())
	}, [onChange, value])

	return (
		<InputGroup w={60}>
			<InputLeftElement pointerEvents="none" color="text-secondary">
				<Search2Icon />
				{/* <FontAwesomeIcon icon={faSearch} size="sm" /> */}
			</InputLeftElement>
			<Input
				value={value}
				variant="filled"
				placeholder={t('search')}
				_placeholder={{ color: 'text-secondary' }}
				onChange={(e) => setValue(e.target.value)}
				{...props}
			/>
			{value && (
				<InputRightElement
					cursor="pointer"
					color="text-secondary"
					onClick={() => setValue('')}
				>
					<FontAwesomeIcon icon={faClose} />
				</InputRightElement>
			)}
		</InputGroup>
	)
}
