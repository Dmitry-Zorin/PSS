import { Head } from 'components'
import { GetStaticProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Index from 'views/Index'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	const translationProps = await serverSideTranslations(locale!, [
		'common',
		'index',
	])
	return {
		props: translationProps,
	}
}

const IndexPage: NextPage = () => {
	const { t } = useTranslation('common')

	return (
		<>
			<Head title={t('name')} desc={t('description')} />
			<Index />
		</>
	)
}

export default IndexPage
