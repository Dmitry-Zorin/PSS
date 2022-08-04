import { Publication } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import { Layout } from 'components'
import { GetStaticProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { useState } from 'react'
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
	const { category } = router.query as Query
	const [query, setQuery] = useState<Query>({ category })

	const { error, data } = useQuery<GetListResponse<Publication>, Error>([
		'publications',
		query,
	])

	return (
		<Layout fullSize error={error} headTitle={category && t(category)}>
			<PublicationsList data={data} query={query} setQuery={setQuery} />
		</Layout>
	)
}

export default PublicationsListPage
