import { Layout } from 'components'
import { NextPage } from 'next'
import useTranslation from 'next-translate/useTranslation'
import { useState } from 'react'
import { Query } from 'types'
import { trpc } from 'utils/trpc'
import AuthorsList from 'views/authors/AuthorsList'

const AuthorsPage: NextPage = () => {
	const { t } = useTranslation('common')
	const [query, setQuery] = useState<Query>({})

	const { error, data } = trpc.useQuery(['author.list'], query)

	return (
		<Layout fullSize error={error} headTitle={t('menu.items.authors')}>
			<AuthorsList data={data} query={query} setQuery={setQuery} />
		</Layout>
	)
}

export default AuthorsPage
