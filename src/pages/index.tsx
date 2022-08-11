import { Head } from 'components'
import { GetStaticProps, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import useTranslation from 'next-translate/useTranslation'
import Index from 'views/Index'

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
