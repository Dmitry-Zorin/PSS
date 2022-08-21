import { dehydrate, QueryClient } from '@tanstack/react-query'
import { Layout } from 'components'
import { useQuery, useUrlQuery } from 'hooks'
import { isEmpty } from 'lodash'
import { GetServerSideProps } from 'next'
import useTranslation from 'next-translate/useTranslation'
import {
	findPublications,
	GetPublicationsResponse,
} from 'server/services/publication'
import { getPublicationsSchema } from 'validations/publication'
import TimelineView from 'views/timeline/Timeline'

const defaultParams = {
	sortField: 'createdAt',
	sortOrder: 'desc',
}

export const getServerSideProps: GetServerSideProps = async ({
	query,
	res,
}) => {
	const queryClient = new QueryClient()
	const queryParams = { ...defaultParams, ...query }
	const parsedQuery = getPublicationsSchema.parse(queryParams)

	const response = await findPublications(parsedQuery)
	await queryClient.setQueryData(['publications', queryParams], response)

	if (isEmpty(query)) {
		res.setHeader(
			'Cache-Control',
			`s-maxage=1, stale-while-revalidate=${30 * 24 * 60 * 60}`,
		)
	}

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
		},
	}
}

export default function TimelinePage() {
	const { t } = useTranslation()
	const queryParams = useUrlQuery()

	const { error, data } = useQuery<GetPublicationsResponse>(
		'publications',
		{
			...defaultParams,
			...queryParams,
		},
		{},
	)

	return (
		<Layout title={t('layout.menu.items.timeline')} error={error}>
			{data && <TimelineView data={data} />}
		</Layout>
	)
}
