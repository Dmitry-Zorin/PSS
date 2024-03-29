import { dehydrate, QueryClient } from '@tanstack/react-query'
import { DEFAULT_CACHE_VALUE } from 'constants/app'
import { GetServerSideProps } from 'next'
import { findPublications } from 'server/services/publication'
import { parseQuery } from 'utils/parsers'
import { getPublicationsSchema } from 'validations/publication'
import TimelineView from 'views/timeline/Timeline'

export const defaultTimelineParams = {
	sortField: 'createdAt',
	sortOrder: 'desc',
}

export const getServerSideProps: GetServerSideProps = async ({
	query,
	res,
}) => {
	const queryClient = new QueryClient()
	const queryParams = { ...defaultTimelineParams, ...query }
	const parsedQuery = parseQuery(getPublicationsSchema, queryParams)

	const response = await findPublications(parsedQuery)
	await queryClient.setQueryData(['publications', queryParams], response, {
		updatedAt: Date.now(),
	})

	res.setHeader('Cache-Control', DEFAULT_CACHE_VALUE)

	return {
		props: {
			dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
		},
	}
}

export default function TimelinePage() {
	return <TimelineView />
}
