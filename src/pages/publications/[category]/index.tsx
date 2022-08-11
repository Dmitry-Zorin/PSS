import { createSSGHelpers } from '@trpc/react/ssg'
import { Layout } from 'components'
import { useRouterQuery } from 'hooks'
import { GetServerSideProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useEffect, useState } from 'react'
import { createContext } from 'server/context'
import { appRouter } from 'server/routers/_app'
import superjson from 'superjson'
import { Query } from 'types'
import { trpc } from 'utils/trpc'
import PublicationsList from 'views/publications/PublicationsList'

export const getServerSideProps: GetServerSideProps = async ({
	locale,
	params,
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
	const ssg = await createSSGHelpers({
		router: appRouter,
		ctx: createContext(),
		transformer: superjson,
	})
	await ssg.fetchQuery('publication.list', {
		category: params!.category as string,
	})
	return {
		props: {
			...translationProps,
			trpcState: ssg.dehydrate(),
		},
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
