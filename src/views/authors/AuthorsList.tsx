import { List } from '@chakra-ui/react'
import {
	ActionsToolbar,
	CreateButton,
	MainArea,
	Pagination,
	Search,
} from 'components'
import { useQuery, useUrlQuery } from 'hooks'
import useTranslation from 'next-translate/useTranslation'
import { GetAuthorsResponse } from 'server/services/author'
import AuthorsListItem from './AuthorsListItem'

export default function AuthorsList() {
	const { t } = useTranslation()
	const queryParams = useUrlQuery()

	const { error, data } = useQuery<GetAuthorsResponse>('authors', queryParams)

	return (
		<MainArea error={error} head={{ title: t('layout.menu.items.authors') }}>
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
		</MainArea>
	)
}
