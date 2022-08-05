import { Publication } from '@prisma/client'
import { ActionsToolbar, CreateButton, ResourceTable, Search } from 'components'
import { useDebounce } from 'hooks'
import { useRouter } from 'next/router'
import { Dispatch, SetStateAction } from 'react'
import { GetListResponse, Query } from 'types'

interface PublicationsListProps {
	data?: GetListResponse<Publication>
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
			<ResourceTable
				data={data?.records}
				fields={['title', 'description', 'year']}
				numeric={['year']}
				skeletonPattern={{
					title: '-'.repeat(100),
					description: '-'.repeat(500),
				}}
				href={`/publications/${category}`}
				sort={sort}
				search={query.search}
			/>
		</>
	)
}
