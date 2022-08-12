import { Layout } from 'components'
import { NextPage } from 'next'
import useTranslation from 'next-translate/useTranslation'
import { trpc } from 'utils'
import TimelineView from 'views/timeline/Timeline'

const TimelinePage: NextPage = () => {
	const { t } = useTranslation()

	const { error, data } = trpc.useQuery([
		'publication.list',
		{
			sortField: 'createdAt',
			sortOrder: 'desc',
		},
	])

	return (
		<Layout title={t('menu.items.timeline')} error={error}>
			{data && <TimelineView data={data} />}
		</Layout>
	)
}

export default TimelinePage
