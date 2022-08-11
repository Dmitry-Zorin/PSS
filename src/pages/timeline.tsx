import { Layout } from 'components'
import { NextPage } from 'next'
import useTranslation from 'next-translate/useTranslation'
import { trpc } from 'utils'
import TimelineView from 'views/timeline/Timeline'

const queryParams = {
	sortField: 'createdAt',
	sortOrder: 'desc',
} as const

const TimelinePage: NextPage = () => {
	const { t } = useTranslation('common')

	const { error, data } = trpc.useQuery(['publication.list', queryParams])

	return (
		<Layout title={t('menu.items.timeline')} error={error as any}>
			{data && <TimelineView data={data} />}
		</Layout>
	)
}

export default TimelinePage
