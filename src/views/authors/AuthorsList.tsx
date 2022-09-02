import {
	ActionsToolbar,
	CreateButton,
	MainArea,
	MainList,
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
				<MainList data={data}>
					{data.records.map((e) => (
						<AuthorsListItem key={e.id} record={e} />
					))}
				</MainList>
			)}
		</MainArea>
	)
}
