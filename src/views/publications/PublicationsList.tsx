import { CreateButton, MainArea, MainList, Search } from 'components'
import { useQuery, useUrlParams, useUrlQuery } from 'hooks'
import useTranslation from 'next-translate/useTranslation'
import { GetPublicationsResponse } from 'server/services/publication'
import PublicationsListItem from './PublicationsListItem'

export default function PublicationsList() {
	const { t } = useTranslation()
	const { type } = useUrlParams()
	const queryParams = useUrlQuery()

	const { error, data } = useQuery<GetPublicationsResponse>('publications', {
		type,
		...queryParams,
	})

	return (
		<MainArea
			fullWidth
			head={{ title: t(`layout.menu.items.${type}`) }}
			error={error}
			leftActions={<Search />}
			rightActions={<CreateButton href={`/publications/${type}/create`} />}
		>
			{data && (
				<MainList key={type} total={data.total}>
					{data.records.map((e) => (
						<PublicationsListItem key={e.id} record={e} />
					))}
				</MainList>
			)}
		</MainArea>
	)
}
