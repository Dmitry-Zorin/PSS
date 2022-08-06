import { Publication } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import { Layout } from 'components'
import { GetStaticProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { GetListResponse, Query } from 'types'
import PublicationsList from 'views/publications/PublicationsList'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	const translationProps = await serverSideTranslations(locale!, [
		'common',
		'fields',
	])
	return {
		props: translationProps,
	}
}

const PublicationsListPage: NextPage = () => {
	const { t } = useTranslation('common', { keyPrefix: 'menu.items' })
	const router = useRouter()
	const [category, setCategory] = useState(router.asPath.split('/').pop()!)
	const [query, setQuery] = useState<Query>({ category })

	useEffect(() => {
		const newCategory = router.query.category as string
		if (newCategory) {
			setCategory(newCategory)
			setQuery((query) => ({
				...query,
				category: newCategory,
			}))
		}
	}, [router.query.category])

	const { error, data } = useQuery<GetListResponse<Publication>, Error>([
		'publications',
		query,
	])

	return (
		<Layout
			fullSize
			error={error}
			headTitle={t(category, { defaultValue: null })}
		>
			<PublicationsList data={data} query={query} setQuery={setQuery} />
		</Layout>
	)
}

export default PublicationsListPage
