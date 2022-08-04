import { Author } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import { Layout } from 'components'
import { GetStaticProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useState } from 'react'
import { GetListResponse, Query } from 'types'
import AuthorsList from 'views/authors/AuthorsList'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
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

	const { error, data } = useQuery<GetListResponse<Author>, Error>([
		'authors',
		query,
	])

	return (
		<Layout fullSize error={error} headTitle={t('authors')}>
			<AuthorsList data={data} query={query} setQuery={setQuery} />
		</Layout>
	)
}

export default AuthorsPage
