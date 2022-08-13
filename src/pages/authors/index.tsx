import { Layout } from 'components'
import { useQuery } from 'hooks'
import { NextPage } from 'next'
import useTranslation from 'next-translate/useTranslation'
import { useState } from 'react'
import { Query } from 'types'

const AuthorsPage: NextPage = () => {
	const { t } = useTranslation()
	const [query, setQuery] = useState<Query>({})

	const { error, data } = useQuery('authors', query)

	return (
		<Layout fullSize error={error} headTitle={t('menu.items.authors')}>
			{/* <AuthorsList data={data} query={query} setQuery={setQuery} /> */}
		</Layout>
	)
}

export default AuthorsPage
