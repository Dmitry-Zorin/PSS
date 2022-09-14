import { List, ListItem } from '@chakra-ui/react'
import { MainArea, Pagination } from 'components'
import { useQuery, useUrlQuery } from 'hooks'
import useTranslation from 'next-translate/useTranslation'
import { defaultTimelineParams } from 'pages/timeline'
import { GetPublicationsResponse } from 'server/services/publication'
import TimelineCard from './TimelineCard'

export default function Timeline() {
	const { t } = useTranslation()
	const queryParams = useUrlQuery()

	const { error, data } = useQuery<GetPublicationsResponse>(
		'publications',
		{
			...defaultTimelineParams,
			...queryParams,
		},
		{},
	)
	return (
		<MainArea title={t('layout.menu.items.timeline')} error={error}>
			{data && (
				<>
					<List spacing={6}>
						{data.records.map((e) => (
							<ListItem key={e.id}>
								<TimelineCard record={e} />
							</ListItem>
						))}
					</List>
					<Pagination total={data.total} />
				</>
			)}
		</MainArea>
	)
}
