import { Text } from '@chakra-ui/react'
import { Publication } from '@prisma/client'
import { HeadTitle, Layout, ResourceTable, Search } from 'components'
import prisma from 'lib/prisma'
import { GetServerSideProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { stdout } from 'process'
import { ParsedUrlQuery } from 'querystring'

interface PublicationsPageProps {
	publications?: Publication[]
	error?: any
}

interface PublicationsPageQuery extends ParsedUrlQuery {
	search: string
}

function getSearch(search: string) {
	const wordsArray = search.trim().split(' ')
	return {
		AND: wordsArray.flatMap((word) => ({
			OR: [
				{ title: { contains: word, mode: 'insensitive' } },
				{ description: { contains: word, mode: 'insensitive' } },
			],
		})),
	}
}

export const getServerSideProps: GetServerSideProps<
	PublicationsPageProps,
	PublicationsPageQuery,
	{ locale: string }
> = async ({ res, query, locale }) => {
	res.setHeader(
		'Cache-Control',
		'public, s-maxage=10, stale-while-revalidate=59',
	)
	try {
		const { category, search } = query as { category: string; search: string }

		const publications = await prisma.publication.findMany({
			where: {
				AND: [{ category }, search ? (getSearch(search) as any) : {}],
			},
			orderBy: {
				createdAt: 'desc',
			},
			skip: 0,
			take: 10,
		})
		return {
			props: {
				publications,
				...(await serverSideTranslations(locale!, ['common', 'fields'])),
			},
		}
	} catch (e: any) {
		stdout.write(e.toString())
		return {
			props: {
				error: e.toString(),
			},
		}
	}
}

const PublicationsPage: NextPage<PublicationsPageProps> = ({
	publications,
	error,
}) => {
	const router = useRouter()
	const { category } = router.query as Record<string, string>
	const { t } = useTranslation(['common', 'fields'])

	return (
		<>
			<HeadTitle title={t(category)} />
			<Layout leftActions={<Search />} fullSize>
				{error && <Text color="red">{error}</Text>}
				{publications && (
					<ResourceTable
						data={publications}
						fields={['title', 'description', 'year']}
						href={`/publications/${category}`}
					/>
				)}
			</Layout>
		</>
	)
}

export default PublicationsPage
