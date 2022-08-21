import { dehydrate, QueryClient } from '@tanstack/react-query'
import { Layout } from 'components'
import { useQuery, useUrlQuery } from 'hooks'
import { isEmpty } from 'lodash'
import { GetServerSideProps } from 'next'
import useTranslation from 'next-translate/useTranslation'
import { findAuthors, GetAuthorsResponse } from 'server/services/author'
import { getAuthorsSchema } from 'validations/author'
import AuthorsList from 'views/authors/AuthorsList'

export const getServerSideProps: GetServerSideProps = async ({
	query,
	res,
}) => {
	const queryClient = new QueryClient()
	const parsedQuery = getAuthorsSchema.parse(query)

	const response = await findAuthors(parsedQuery)
	await queryClient.setQueryData(['authors', query], response)

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

export default function AuthorsPage() {
	const { t } = useTranslation()
	const queryParams = useUrlQuery()

	const { error, data } = useQuery<GetAuthorsResponse>('authors', queryParams)

	return (
		<Layout fullSize error={error} headTitle={t('layout.menu.items.authors')}>
			{data && <AuthorsList data={data} />}
		</Layout>
	)
}
