import {
	Input,
	InputGroup,
	InputLeftElement,
	InputProps,
} from '@chakra-ui/react'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { Icon } from 'components'
import { useRedirect, useUrlQuery } from 'hooks'
import useTranslation from 'next-translate/useTranslation'
import { useEffect, useState } from 'react'

export default function Search({ ...props }: InputProps) {
	const { t } = useTranslation()
	const queryParams = useUrlQuery()
	const redirect = useRedirect()
	const [value, setValue] = useState(queryParams.search ?? '')

	useEffect(() => {
		setValue(queryParams.search ?? '')
	}, [queryParams.search])

	async function search() {
		await redirect({
			query: {
				...queryParams,
				search: value.trim() || undefined,
				page: undefined,
			},
		})
	}

	return (
		<InputGroup maxW={64}>
			<InputLeftElement>
				<Icon icon={faSearch} />
			</InputLeftElement>
			<Input
				value={value}
				placeholder={t('actions.search')}
				onChange={(e) => setValue(e.target.value)}
				onKeyDown={(e) => {
					e.key === 'Enter' && search()
				}}
				{...props}
			/>
		</InputGroup>
	)
}
