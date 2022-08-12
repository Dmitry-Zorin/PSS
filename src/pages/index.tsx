import { Head } from 'components'
import { NextPage } from 'next'
import useTranslation from 'next-translate/useTranslation'
import Index from 'views/Index'

const IndexPage: NextPage = () => {
	const { t } = useTranslation()

	return (
		<>
			<Head title={t('name')} desc={t('description')} />
			<Index />
		</>
	)
}

export default IndexPage
