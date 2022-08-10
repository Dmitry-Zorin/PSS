import { List } from '@chakra-ui/react'
import { ActionsToolbar, CreateButton, Search } from 'components'
import { useDebounce } from 'hooks'
import { useRouter } from 'next/router'
import { Dispatch, SetStateAction } from 'react'
import { Query } from 'types'
import { inferQueryOutput } from 'utils/trpc'
import PublicationsListItem from './PublicationsListItem'

interface PublicationsListProps {
	data?: inferQueryOutput<'publication.list'>
	query: Query
	setQuery: Dispatch<SetStateAction<Query>>
}

export default function PublicationsList({
	data,
	query,
	setQuery,
}: PublicationsListProps) {
	const router = useRouter()
	const { category } = router.query as Record<string, string>

	const search = useDebounce((search: string) => {
		setQuery((query) => {
			return (search || undefined) !== query.search
				? { ...query, search: search || undefined }
				: query
		})
	})

	function sort(field: string, value?: 'desc' | 'asc') {
		setQuery({
			...query,
			sort: value ? JSON.stringify({ [field]: value }) : '{}',
		})
	}

	return (
		<>
			<ActionsToolbar
				leftActions={<Search onChange={search} />}
				rightActions={
					<CreateButton href={`/publications/${category}/create`} />
				}
			/>
			<List borderBottom="1px" borderColor="border" pt={4}>
				{data &&
					data.records.map((e) => (
						<PublicationsListItem key={e.id} record={e} search={query.search} />
					))}
			</List>
		</>
	)
}
