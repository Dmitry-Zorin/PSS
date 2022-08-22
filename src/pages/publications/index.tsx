import { dehydrate, QueryClient } from '@tanstack/react-query'
import { Layout } from 'components'
import { useQuery, useUrlQuery } from 'hooks'
import { GetServerSideProps } from 'next'
import useTranslation from 'next-translate/useTranslation'
import {
	findPublications,
	GetPublicationsResponse,
} from 'server/services/publication'
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

	if (Object.keys(query).length === 1) {
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

export default function PublicationsListPage() {
	const { t } = useTranslation()
	const queryParams = useUrlQuery()

	const { error, data } = useQuery<GetPublicationsResponse>(
		'publications',
		queryParams,
	)

	return (
		<Layout
			fullSize
			error={error}
			headTitle={t(`layout.menu.items.publications`)}
		>
			{data && <PublicationsList data={data} />}
		</Layout>
	)
}
