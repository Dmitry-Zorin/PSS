import { Publication } from '@prisma/client'
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query'
import { HeadTitle, Layout, ResourceTable, Search } from 'components'
import { useDebounce } from 'hooks'
import { GetServerSideProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { queryClientConfig } from 'pages/_app'
import { useState } from 'react'

export const getServerSideProps: GetServerSideProps = async ({
	params,
	locale,
}) => {
	const translationProps = await serverSideTranslations(locale!, [
		'common',
		'fields',
	])

	const queryClient = new QueryClient(queryClientConfig)

	if (params?.category) {
		const query = { category: params.category as string, search: undefined }
		await queryClient.prefetchQuery(['publications', query])
	}

	return {
		props: {
			dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
			...translationProps,
		},
	}
}

const PublicationsPage: NextPage = () => {
	const { t } = useTranslation(['common', 'fields'])
	const router = useRouter()
	const { category } = router.query as Record<string, string>
	const [query, setQuery] = useState<Record<string, string | undefined>>({
		category,
	})

	const { data: publications } = useQuery<Publication[]>([
		'publications',
		query,
	])

	const search = useDebounce((search: string) => {
		setQuery({ ...query, search: search || undefined })
	}, 500)

	function sort(field: string, value?: 'desc' | 'asc') {
		setQuery({
			...query,
			sort: value ? JSON.stringify({ [field]: value }) : '{}',
		})
	}

	return (
		<>
			<HeadTitle title={t(category)} />
			<Layout fullSize leftActions={<Search onChange={search} />}>
				{publications && (
					<ResourceTable
						data={publications}
						fields={['title', 'description', 'year']}
						href={`/publications/${category}`}
						sort={sort}
					/>
				)}
			</Layout>
		</>
	)
}

export default PublicationsPage
