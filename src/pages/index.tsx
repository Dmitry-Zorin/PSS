import useTranslation from 'next-translate/useTranslation'
import Head from 'next/head'
import Index from 'views/Index'

function IndexPage() {
	const { t } = useTranslation()

	return (
		<>
			<Head>
				<title>{t('name')}</title>
				<meta name="description" content={t('description')} />
			</Head>
			<Index />
		</>
	)
}

IndexPage.useLayout = false

export default IndexPage
