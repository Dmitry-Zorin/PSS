import { Layout } from 'components'
import useTranslation from 'next-translate/useTranslation'
import About from 'views/About'

export default function AboutPage() {
	const { t } = useTranslation()

	return (
		<Layout title={t('layout.menu.items.about')}>
			<About />
		</Layout>
	)
}
