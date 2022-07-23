import { Author } from '@prisma/client'
import { HeadTitle, Layout, ResourceTable, Search } from 'components'
import prisma from 'lib/prisma'
import { GetServerSideProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Link from 'next/link'
import { ParsedUrlQuery } from 'querystring'

interface AuthorsPageProps {
	authors?: Author[]
}

interface AuthorsPageQuery extends ParsedUrlQuery {
	search: string
}

export const getServerSideProps: GetServerSideProps<
	AuthorsPageProps,
	AuthorsPageQuery
> = async ({ res, query, locale }) => {
	res.setHeader(
		'Cache-Control',
		'public, s-maxage=10, stale-while-revalidate=59',
	)
	const { search } = query

	// await new Promise((resolve) => setTimeout(resolve, 3000))

	const authors = await prisma.author.findMany({
		take: 10,
		...(typeof search === 'string' &&
			(() => {
				const wordsArray = search.trim().split(' ')
				return {
					where: {
						AND: wordsArray.flatMap((word) => ({
							OR: [
								{ lastName: { contains: word, mode: 'insensitive' } },
								{ firstName: { contains: word, mode: 'insensitive' } },
								{ middleName: { contains: word, mode: 'insensitive' } },
							],
						})),
					},
				}
			})()),
	})

	return {
		props: {
			authors,
			...(await serverSideTranslations(locale!, ['common', 'fields'])),
		},
	}
}

const AuthorsPage: NextPage<AuthorsPageProps> = ({ authors }) => {
	const { t } = useTranslation('common', { keyPrefix: 'menu.items' })

	return (
		<>
			<HeadTitle title={t('authors')} />
			<Layout leftActions={<Search />} fullSize>
				{authors && (
					<ResourceTable
						data={authors}
						fields={['lastName', 'firstName', 'middleName']}
						href="/authors"
					/>
				)}
			</Layout>
		</>
	)
}

export default AuthorsPage
