import { ActionsToolbar, CreateButton, ResourceTable, Search } from 'components'
import { useDebounce } from 'hooks'
import { useRouter } from 'next/router'
import { Dispatch, SetStateAction } from 'react'
import { GetPublicationsResponse, Query } from 'types'

interface PublicationsListViewProps {
	data?: GetPublicationsResponse
	query: Query
	setQuery: Dispatch<SetStateAction<Query>>
}

export default function PublicationsListView({
	data,
	query,
	setQuery,
}: PublicationsListViewProps) {
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
			<ResourceTable
				data={data?.publications}
				fields={['title', 'description', 'year']}
				href={`/publications/${category}`}
				sort={sort}
				search={query.search}
			/>
		</>
	)
}
