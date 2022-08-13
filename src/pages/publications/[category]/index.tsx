import { dehydrate, QueryClient } from '@tanstack/react-query'
import { Layout } from 'components'
import { useQuery, useRouterQuery } from 'hooks'
import { GetServerSideProps, NextPage } from 'next'
import useTranslation from 'next-translate/useTranslation'
import { useEffect, useState } from 'react'
import {
	findPublications,
	GetPublicationsResponse,
} from 'server/services/publication'
import { Query } from 'types'
import { publicationFiltersSchema } from 'validations/publication'
import PublicationsList from 'views/publications/PublicationsList'

export const getServerSideProps: GetServerSideProps = async ({
	res,
	params,
}) => {
	res.setHeader(
		'Cache-Control',
		`s-maxage=1, stale-while-revalidate=${30 * 24 * 60 * 60}`,
	)

	const queryClient = new QueryClient()
	const query = publicationFiltersSchema.parse(params)

	await queryClient.prefetchQuery(['publications', params], () => {
		return findPublications(query)
	})

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
		},
	}
}

const PublicationsListPage: NextPage = () => {
	const { t } = useTranslation()
	const { category } = useRouterQuery()

	const [query, setQuery] = useState<Query>({ category })

	useEffect(() => {
		setQuery((query) => ({
			...query,
			category,
		}))
	}, [category])

	const { error, data } = useQuery<GetPublicationsResponse>(
		'publications',
		query,
		{
			enabled: !!query.category,
			keepPreviousData: true,
		},
	)

	return (
		<Layout
			fullSize
			error={error}
			headTitle={category && t(`menu.items.${category}`)}
		>
			<PublicationsList data={data} query={query} setQuery={setQuery} />
		</Layout>
	)
}

export default PublicationsListPage
