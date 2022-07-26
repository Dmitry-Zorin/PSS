import { CloseIcon, Search2Icon } from '@chakra-ui/icons'
import {
	Input,
	InputGroup,
	InputLeftElement,
	InputProps,
	InputRightElement,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'

interface SearchProps extends Omit<InputProps, 'onChange'> {
	onChange: (search: string) => void
}

export default function Search({ onChange, ...props }: SearchProps) {
	const { t } = useTranslation('fields')
	const [value, setValue] = useState('')

	function update(search: string) {
		setValue(search)
		onChange(search)
	}

	return (
		<InputGroup w={60}>
			<InputLeftElement pointerEvents="none" color="text-secondary">
				<Search2Icon />
			</InputLeftElement>
			<Input
				value={value}
				variant="filled"
				placeholder={t('search')}
				_placeholder={{ color: 'text-secondary' }}
				onChange={(e) => update(e.target.value)}
				{...props}
			/>
			{props.value && (
				<InputRightElement
					cursor="pointer"
					color="text-secondary"
					onClick={() => update('')}
				>
					<CloseIcon boxSize={3} />
				</InputRightElement>
			)}
		</InputGroup>
	)
}
