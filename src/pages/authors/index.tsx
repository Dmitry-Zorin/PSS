import { Layout } from 'components'
import { GetServerSideProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useState } from 'react'
import { Query } from 'types'
import { trpc } from 'utils/trpc'
import AuthorsList from 'views/authors/AuthorsList'

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
	const translationProps = await serverSideTranslations(locale!, [
		'common',
		'fields',
	])
	return {
		props: translationProps,
	}
}

const AuthorsPage: NextPage = () => {
	const { t } = useTranslation('common', { keyPrefix: 'menu.items' })
	const [query, setQuery] = useState<Query>({})

	const { error, data } = trpc.useQuery(['author.list'], query)

	return (
		<Layout fullSize error={error} headTitle={t('authors')}>
			<AuthorsList data={data} query={query} setQuery={setQuery} />
		</Layout>
	)
}

export default AuthorsPage
