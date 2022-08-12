import { Layout } from 'components'
import { NextPage } from 'next'
import useTranslation from 'next-translate/useTranslation'
import About from 'views/About'

const AboutPage: NextPage = () => {
	const { t } = useTranslation()

	return (
		<Layout title={t('menu.items.about')}>
			<About />
		</Layout>
	)
}

export default AboutPage
