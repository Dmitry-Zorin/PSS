import { dehydrate, QueryClient } from '@tanstack/react-query'
import { DEFAULT_CACHE_VALUE } from 'constants/app'
import { GetServerSideProps } from 'next'
import { findPublications } from 'server/services/publication'
import { getPublicationsSchema } from 'validations/publication'
import PublicationsList from 'views/publications/PublicationsList'

export const getServerSideProps: GetServerSideProps = async ({
	query,
	res,
}) => {
	const queryClient = new QueryClient()
	const parsedQuery = getPublicationsSchema.parse(query)

	const records = await findPublications(parsedQuery)
	await queryClient.setQueryData(['publications', query], records)

	res.setHeader('Cache-Control', DEFAULT_CACHE_VALUE)

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
		},
	}
}

export default function PublicationsListPage() {
	return <PublicationsList />
}
