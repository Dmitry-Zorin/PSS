import { Author } from '@prisma/client'
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query'
import { HeadTitle, Layout, ResourceTable, Search } from 'components'
import { GetServerSideProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

async function getAuthors() {
	const res = await fetch('/api/authors')
	return res.json()
}

export const getStaticProps: GetServerSideProps = async ({ locale }) => {
	const queryClient = new QueryClient()
	await queryClient.prefetchQuery(['authors'], getAuthors)

	return {
		props: {
			...(await serverSideTranslations(locale!, ['common', 'fields'])),
			dehydratedState: dehydrate(queryClient),
		},
	}
}

const AuthorsPage: NextPage = () => {
	const { t } = useTranslation('common', { keyPrefix: 'menu.items' })
	const { data: authors } = useQuery<Author[]>(['authors'], getAuthors)

	return (
		<>
			<HeadTitle title={t('authors')} />
			<Layout leftActions={<Search />} fullSize>
				{authors && (
					<ResourceTable
						data={authors}
						fields={['lastName', 'firstName', 'middleName']}
						href="/authors"
					/>
				)}
			</Layout>
		</>
	)
}

export default AuthorsPage
