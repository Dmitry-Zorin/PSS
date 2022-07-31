import { Layout } from 'components'
import { GetServerSideProps, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'react-i18next'
import AboutView from 'views/AboutView'

export const getStaticProps: GetServerSideProps = async ({ locale }) => {
	return {
		props: await serverSideTranslations(locale!, ['about', 'common']),
	}
}

const AboutPage: NextPage = () => {
	const { t } = useTranslation('common', { keyPrefix: 'menu.items' })

	return (
		<Layout title={t('about')}>
			<AboutView />
		</Layout>
	)
}

export default AboutPage
