import { Layout } from 'components'
import { GetStaticProps, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'react-i18next'
import About from 'views/About'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	const translationProps = await serverSideTranslations(locale!, [
		'about',
		'common',
	])
	return {
		props: translationProps,
	}
}

const AboutPage: NextPage = () => {
	const { t } = useTranslation('common', { keyPrefix: 'menu.items' })

	return (
		<Layout title={t('about')}>
			<About />
		</Layout>
	)
}

export default AboutPage
