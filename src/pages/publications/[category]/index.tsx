import { dehydrate, QueryClient } from '@tanstack/react-query'
import { CreateButton, Layout, Search } from 'components'
import { useQuery, useUrlParams, useUrlQuery } from 'hooks'
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

	const response = await findPublications(parsedQuery)
	await queryClient.setQueryData(['publications', query], response)

	if (Object.keys(query).length === 1 && 'category' in query) {
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
	const { category } = useUrlParams()
	const queryParams = useUrlQuery()

	const { error, data } = useQuery<GetPublicationsResponse>('publications', {
		category,
		...queryParams,
	})

	return (
		<Layout
			fullSize
			error={error}
			headTitle={t(`layout.menu.items.${category}`)}
			leftActions={<Search />}
			rightActions={<CreateButton href={`/publications/${category}/create`} />}
		>
			{data && <PublicationsList key={category} data={data} />}
		</Layout>
	)
}
