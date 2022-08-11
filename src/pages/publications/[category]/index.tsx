import { createSSGHelpers } from '@trpc/react/ssg'
import { Layout } from 'components'
import { useRouterQuery } from 'hooks'
import { GetServerSideProps, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import useTranslation from 'next-translate/useTranslation'
import { useEffect, useState } from 'react'
import { createContext } from 'server/context'
import { appRouter } from 'server/routers/_app'
import superjson from 'superjson'
import { Query } from 'types'
import { trpc } from 'utils/trpc'
import PublicationsList from 'views/publications/PublicationsList'

const PublicationsListPage: NextPage = () => {
	const { t } = useTranslation('common')
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
		<Layout
			fullSize
			error={error}
			headTitle={category && t(`menu.items.${category}`)}
		>
			<PublicationsList data={data} query={query} setQuery={setQuery} />
		</Layout>
	)
}

export default PublicationsListPage
