import { dehydrate, QueryClient } from '@tanstack/react-query'
import { DEFAULT_CACHE_VALUE } from 'constants/app'
import { GetServerSideProps } from 'next'
import { findAuthors } from 'server/services/author'
import { getAuthorsSchema } from 'validations/author'
import AuthorsList from 'views/authors/AuthorsList'

export const getServerSideProps: GetServerSideProps = async ({
	query,
	res,
}) => {
	const queryClient = new QueryClient()
	const parsedQuery = getAuthorsSchema.strip().parse(query)

	const response = await findAuthors(parsedQuery)
	await queryClient.setQueryData(['authors', query], response, {
		updatedAt: Date.now(),
	})

	res.setHeader('Cache-Control', DEFAULT_CACHE_VALUE)

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
		},
	}
}

export default function AuthorsPage() {
	return <AuthorsList />
}
