import {
	GetStaticPaths,
	GetStaticPropsContext,
	InferGetStaticPropsType,
} from 'next'
import prisma from 'server/prisma'
import { findPublication } from 'server/services/publication'
import { isDevelopment } from 'utils/env'
import { getSafeAsync } from 'utils/helpers'
import PublicationsShow from 'views/publications/PublicationsShow'

export const getStaticPaths: GetStaticPaths = async () => {
	if (isDevelopment) {
		return { paths: [], fallback: 'blocking' }
	}

	const publications = await prisma.publication.findMany()

	return {
		paths: publications.flatMap(({ id, type }) => {
			return ['ru', 'en'].map((locale) => ({
				params: {
					type,
					id: id.toString(),
				},
				locale,
			}))
		}),
		fallback: 'blocking',
	}
}

export const getStaticProps = async ({
	params,
}: GetStaticPropsContext<{ id: string; publication?: string }>) => {
	const record = await getSafeAsync(() => findPublication(+params!.id))
	return {
		props: JSON.parse(JSON.stringify(record)),
	}
}

export default function PublicationsShowPage({
	error,
	data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
	return <PublicationsShow error={error} data={data} />
}
