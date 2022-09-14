import { MainArea, MainList, Search } from 'components'
import { useQuery, useUrlQuery } from 'hooks'
import useTranslation from 'next-translate/useTranslation'
import { GetPublicationsResponse } from 'server/services/publication'
import PublicationsListItem from './PublicationsListItem'

export default function PublicationsListFull() {
	const { t } = useTranslation()
	const queryParams = useUrlQuery()

	const { error, data } = useQuery<GetPublicationsResponse>('publications', {
		...queryParams,
	})

	return (
		<MainArea
			fullWidth
			head={{ title: t(`layout.menu.items.publications`) }}
			error={error}
			leftActions={<Search />}
		>
			{data && (
				<MainList resource="publications" data={data}>
					{data.records.map((e) => (
						<PublicationsListItem key={e.id} record={e} showIcon />
					))}
				</MainList>
			)}
		</MainArea>
	)
}
