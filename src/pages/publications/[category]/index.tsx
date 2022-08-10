import { Layout } from 'components'
import { useRouterQuery } from 'hooks'
import { GetServerSideProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useEffect, useState } from 'react'
import { Query } from 'types'
import { trpc } from 'utils/trpc'
import PublicationsList from 'views/publications/PublicationsList'

export const getServerSideProps: GetServerSideProps = async ({
	locale,
	res,
}) => {
	const translationProps = await serverSideTranslations(locale!, [
		'common',
		'fields',
	])
	res.setHeader(
		'Cache-Control',
		`s-maxage=1, stale-while-revalidate=${30 * 24 * 60 * 60}`,
	)
	return {
		props: translationProps,
	}
}

const PublicationsListPage: NextPage = () => {
	const { t } = useTranslation('common', { keyPrefix: 'menu.items' })
	const { category } = useRouterQuery()

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
