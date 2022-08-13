import { dehydrate, QueryClient } from '@tanstack/react-query'
import { Layout } from 'components'
import { useQuery } from 'hooks'
import { GetServerSideProps, NextPage } from 'next'
import useTranslation from 'next-translate/useTranslation'
import {
	findPublications,
	GetPublicationsResponse,
} from 'server/services/publication'
import { publicationFiltersSchema } from 'validations/publication'
import TimelineView from 'views/timeline/Timeline'

const defaultParams = {
	sortField: 'createdAt',
	sortOrder: 'desc',
}

export const getServerSideProps: GetServerSideProps = async ({
	res,
	params,
}) => {
	res.setHeader(
		'Cache-Control',
		`s-maxage=1, stale-while-revalidate=${30 * 24 * 60 * 60}`,
	)

	const queryClient = new QueryClient()
	const query = publicationFiltersSchema.parse(params ?? defaultParams)

	await queryClient.prefetchQuery(['publications', defaultParams], () => {
		return findPublications(query)
	})

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
		},
	}
}

const TimelinePage: NextPage = () => {
	const { t } = useTranslation()

	const { error, data } = useQuery<GetPublicationsResponse>(
		'publications',
		{
			sortField: 'createdAt',
			sortOrder: 'desc',
		},
		{
			keepPreviousData: true,
		},
	)

	return (
		<Layout title={t('menu.items.timeline')} error={error}>
			{data && <TimelineView data={data} />}
		</Layout>
	)
}

export default TimelinePage
