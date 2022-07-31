import { Publication } from '@prisma/client'
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query'
import { CreateButton, Layout, ResourceTable, Search } from 'components'
import { useDebounce } from 'hooks'
import { GetStaticProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	const translationProps = await serverSideTranslations(locale!, [
		'common',
		'fields',
	])

	const queryClient = new QueryClient()

	return {
		props: {
			dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
			...translationProps,
		},
	}
}

const PublicationsListPage: NextPage = () => {
	const { t } = useTranslation('common')
	const router = useRouter()
	const { category } = router.query as Record<string, string>
	const [query, setQuery] = useState<Record<string, string | undefined>>({
		category,
	})

	const { data } = useQuery<{ publications: Publication[]; total: number }>([
		'publications',
		query,
	])

	const search = useDebounce((search: string) => {
		setQuery((query) => {
			return (search || undefined) !== query.search
				? { ...query, search: search || undefined }
				: query
		})
	})

	function sort(field: string, value?: 'desc' | 'asc') {
		setQuery({
			...query,
			sort: value ? JSON.stringify({ [field]: value }) : '{}',
		})
	}

	return (
		<Layout
			fullSize
			headTitle={category && t(`menu.items.${category}`)}
			leftActions={<Search onChange={search} />}
			rightActions={
				<Link href={`/publications/${category}/create`} passHref>
					<CreateButton as="a" />
				</Link>
			}
		>
			<ResourceTable
				data={data?.publications}
				fields={['title', 'description', 'year']}
				href={`/publications/${category}`}
				sort={sort}
				search={query.search}
			/>
		</Layout>
	)
}

export default PublicationsListPage
