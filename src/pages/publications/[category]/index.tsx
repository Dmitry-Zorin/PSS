import { Layout } from 'components'
import { useRouterQuery } from 'hooks'
import { NextPage } from 'next'
import useTranslation from 'next-translate/useTranslation'
import { useEffect, useState } from 'react'
import { Query } from 'types'
import { trpc } from 'utils/trpc'
import PublicationsList from 'views/publications/PublicationsList'

const PublicationsListPage: NextPage = () => {
	const { t } = useTranslation()
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
