import { Layout } from 'components'
import { GetStaticProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import PublicationsCreateView from 'views/publications/PublicationsCreateView'

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

const PublicationsCreatePage: NextPage = () => {
	const { t } = useTranslation('resources')
	const router = useRouter()
	const { category } = router.query as { category: string }

	return (
		<Layout title={category && t(`${category}.create`)}>
			<PublicationsCreateView />
		</Layout>
	)
}

export default PublicationsCreatePage
