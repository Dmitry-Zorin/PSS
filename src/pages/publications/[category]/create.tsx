import { Layout } from 'components'
import { useRouterQuery } from 'hooks'
import { GetServerSideProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import PublicationsCreate from 'views/publications/PublicationsCreate'

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
	const translationProps = await serverSideTranslations(locale!, [
		'common',
		'resources',
		'fields',
	])
	return {
		props: translationProps,
	}
}

const PublicationsCreatePage: NextPage = () => {
	const { t } = useTranslation('resources')
	const { category } = useRouterQuery()

	return (
		<Layout title={category && t(`${category}.create`)}>
			<PublicationsCreate />
		</Layout>
	)
}

export default PublicationsCreatePage
