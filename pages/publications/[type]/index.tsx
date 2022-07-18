import { Text } from '@chakra-ui/react'
import { Publication } from '@prisma/client'
import { HeadTitle, Layout, ResourceTable, Search } from 'components'
import prisma from 'lib/prisma'
import { debounce } from 'lodash'
import { GetServerSideProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { stdout } from 'process'
import { ParsedUrlQuery } from 'querystring'
import { useEffect, useMemo, useState } from 'react'

interface PublicationsPageProps {
	publications?: Publication[]
	error?: any
}

interface PublicationsPageQuery extends ParsedUrlQuery {
	search: string
}

export const getServerSideProps: GetServerSideProps<
	PublicationsPageProps,
	PublicationsPageQuery
> = async ({ res, query, locale }) => {
	res.setHeader(
		'Cache-Control',
		'public, s-maxage=10, stale-while-revalidate=59',
	)
	try {
		const { search } = query

		const publications = await prisma.publication.findMany({
			take: 10,
			...(typeof search === 'string' &&
				(() => {
					const searchQuery = search.trim().replace(/ /g, ':* & ') + ':*'
					return {
						where: {
							OR: [
								{ title: { search: searchQuery } },
								{ description: { search: searchQuery } },
							],
						},
						orderBy: {
							_relevance: {
								fields: ['title', 'description'],
								search: searchQuery,
								sort: 'desc',
							},
						},
					}
				})()),
		})
		return {
			props: {
				publications,
				...(await serverSideTranslations(locale!, [
					'common',
					'menu',
					'fields',
				])),
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

const Publications: NextPage<PublicationsPageProps> = ({
	publications,
	error,
}) => {
	const router = useRouter()
	const { type, search } = router.query as Record<string, string>
	const { t } = useTranslation(['common', 'menu', 'fields'])
	const [searchQuery, setSearchQuery] = useState(search ?? '')

	const debouncedSearch = useMemo(() => {
		return debounce((search: string) => {
			const [basepath, params] = router.asPath.split('?')
			const query = new URLSearchParams(params)
			if (search !== '') {
				query.set('search', search)
			} else {
				query.delete('search')
			}
			router.replace(`${basepath}${query.has('search') ? `?${query}` : ''}`)
		}, 300)
	}, [router])

	useEffect(() => {
		return () => debouncedSearch.cancel()
	}, [debouncedSearch])

	return (
		<>
			<HeadTitle title={t(type, { ns: 'menu' })} />
			<Layout
				leftActions={
					<Search
						value={searchQuery}
						onChange={(e) => {
							setSearchQuery(e.target.value)
							debouncedSearch(e.target.value)
						}}
					/>
				}
				fullSize
			>
				{error && <Text color="red">{error}</Text>}
				{publications && (
					<ResourceTable
						data={publications}
						fields={['title', 'year']}
						RowLink={<Link href={`./${type}`} />}
					/>
				)}
			</Layout>
		</>
	)
}

export default Publications
