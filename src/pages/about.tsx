import { Layout } from 'components'
import { GetStaticProps, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'react-i18next'
import About from 'views/About'

const AboutPage: NextPage = () => {
	const { t } = useTranslation('common')

	return (
		<Layout title={t('menu.items.about')}>
			<About />
		</Layout>
	)
}

export default AboutPage
