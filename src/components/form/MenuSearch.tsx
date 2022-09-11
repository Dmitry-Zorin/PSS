import {
	Input,
	InputGroup,
	InputLeftElement,
	InputRightElement,
	useMenuItem,
	UseMenuItemProps,
} from '@chakra-ui/react'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { Icon, Spinner } from 'components'
import { useDebounce } from 'hooks'
import useTranslation from 'next-translate/useTranslation'
import { useState } from 'react'

interface MenuSearchProps extends UseMenuItemProps {
	search: (value?: string) => void
	isLoading: boolean
}

export default function MenuSearch({
	search,
	isLoading,
	...props
}: MenuSearchProps) {
	const { t } = useTranslation('resources')
	const { role, ...rest } = useMenuItem(props)
	const [value, setValue] = useState('')

	const searchFn = useDebounce((value: string) => {
		search(value.trim() || undefined)
	}, 200)

	return (
		<InputGroup role={role} px={1} pb={2}>
			<InputLeftElement pl={3}>
				<Icon icon={faSearch} />
			</InputLeftElement>
			<Input
				value={value}
				placeholder={t('common:actions.search')}
				isInvalid={false}
				onChange={(e) => {
					setValue(e.target.value)
					searchFn(e.target.value)
				}}
				{...rest}
			/>
			{isLoading && (
				<InputRightElement pr={3}>
					<Spinner size="sm" thickness="2px" />
				</InputRightElement>
			)}
		</InputGroup>
	)
}
