import { Publication } from '@prisma/client'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Layout, ListButton } from 'components'
import { GetStaticProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Link from 'next/link'
import { useRouter } from 'next/router'
import PublicationsShowView from 'views/publications/PublicationsShowView'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	const translationProps = await serverSideTranslations(locale!, [
		'common',
		'resources',
		'fields',
	])
	return {
		props: translationProps,
	}
}

const PublicationsShowPage: NextPage = () => {
	const { t } = useTranslation('resources')
	const queryClient = useQueryClient()
	const router = useRouter()

	const { category, id } = router.query as {
		category: string
		id: string
	}

	const { error, data } = useQuery<Publication, Error>(
		['publications', { id }],
		{
			// initialData: () => {
			// 	return queryClient
			// 		.getQueryData<Publication[]>(['publications'], { exact: false })
			// 		?.find((e) => e.id.toString() === id)
			// },
			// initialDataUpdatedAt: () => {
			// 	return queryClient.getQueryState(['publications'], {
			// 		exact: false,
			// 	})?.dataUpdatedAt
			// },
		},
	)

	return (
		<Layout
			error={error}
			headTitle={id && `${t(`${category}.name`, { count: 1 })} #${id}`}
			title={data?.title}
			rightActions={
				<Link href={`/publications/${category}`} passHref>
					<ListButton as="a" />
				</Link>
			}
		>
			<PublicationsShowView data={data} />
		</Layout>
	)
}

export default PublicationsShowPage
