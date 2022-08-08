import { Head } from 'components'
import { GetServerSideProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Index from 'views/Index'

export const getStaticProps: GetServerSideProps = async ({ locale }) => {
	return {
		props: await serverSideTranslations(locale!, ['common', 'index']),
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
