import { Layout } from 'components'
import { GetStaticProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Query } from 'types'
import { trpc } from 'utils/trpc'
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

	const { category } = router.query as { category: string }

	const [query, setQuery] = useState<Query>({ category })

	useEffect(() => {
		setQuery((query) => ({
			...query,
			category,
		}))
	}, [category])

	const { error, data } = trpc.useQuery(['publication.list', query], {
		enabled: !!query.category,
	})

	return (
		<Layout fullSize error={error} headTitle={category && t(category)}>
			<PublicationsList data={data} query={query} setQuery={setQuery} />
		</Layout>
	)
}

export default PublicationsListPage
