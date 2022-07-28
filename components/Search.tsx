import {
	Input,
	InputGroup,
	InputLeftElement,
	InputProps,
	InputRightElement,
} from '@chakra-ui/react'
import { faClose, faSearch } from '@fortawesome/free-solid-svg-icons'
import { Icon } from 'components'
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
				<Icon icon={faSearch} />
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
					_hover={{ color: 'primary' }}
				>
					<Icon icon={faClose} />
				</InputRightElement>
			)}
		</InputGroup>
	)
}
