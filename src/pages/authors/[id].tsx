import {
	GetStaticPaths,
	GetStaticPropsContext,
	InferGetStaticPropsType,
} from 'next'
import prisma from 'server/prisma'
import { findAuthor } from 'server/services/author'
import { isDevelopment } from 'utils/env'
import { getSafeAsync } from 'utils/helpers'
import AuthorsShow from 'views/authors/AuthorsShow'

export const getStaticPaths: GetStaticPaths = async () => {
	if (isDevelopment) {
		return { paths: [], fallback: 'blocking' }
	}

	const authors = await prisma.author.findMany()

	return {
		paths: authors.flatMap(({ id }) => {
			return ['ru', 'en'].map((locale) => ({
				params: { id: id.toString() },
				locale,
			}))
		}),
		fallback: 'blocking',
	}
}

export const getStaticProps = async ({
	params,
}: GetStaticPropsContext<{ id: string; publication?: string }>) => {
	const record = await getSafeAsync(() => findAuthor(+params!.id))
	return {
		props: JSON.parse(JSON.stringify(record)),
	}
}

export default function AuthorsShowPage({
	error,
	data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
	return <AuthorsShow error={error} data={data} />
}
