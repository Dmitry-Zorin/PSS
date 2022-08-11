import { Layout } from 'components'
import { useRouterQuery } from 'hooks'
import { NextPage } from 'next'
import useTranslation from 'next-translate/useTranslation'
import PublicationsCreate from 'views/publications/PublicationsCreate'

const PublicationsCreatePage: NextPage = () => {
	const { t } = useTranslation('resources')
	const { category } = useRouterQuery()

	return (
		<Layout title={category && t(`${category}.create`)}>
			<PublicationsCreate />
		</Layout>
	)
}

export default PublicationsCreatePage
