import { List } from '@chakra-ui/react'
import { ActionsToolbar, CreateButton, Pagination, Search } from 'components'
import { GetAuthorsResponse } from 'server/services/author'
import AuthorsListItem from './AuthorsListItem'

interface AuthorsListProps {
	data: GetAuthorsResponse
}

export default function AuthorsList({ data }: AuthorsListProps) {
	return (
		<>
			<ActionsToolbar
				leftActions={<Search />}
				rightActions={<CreateButton href={`/authors/create`} />}
			/>
			{data && (
				<>
					<List borderBottom="1px" borderColor="border" pt={4}>
						{data.records.map((e) => (
							<AuthorsListItem key={e.id} record={e} />
						))}
					</List>
					<Pagination total={data?.total} />
				</>
			)}
		</>
	)
}
