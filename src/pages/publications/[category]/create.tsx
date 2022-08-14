import { Layout } from 'components'
import resources from 'constants/resources'
import { useRouterQuery } from 'hooks'
import { GetStaticPaths, NextPage } from 'next'
import useTranslation from 'next-translate/useTranslation'
import PublicationsCreate from 'views/publications/PublicationsCreate'

export const getStaticPaths: GetStaticPaths = () => {
	return {
		paths: Object.keys(resources.publications).flatMap((category) => {
			return ['ru', 'en'].map((locale) => ({
				params: { category },
				locale,
			}))
		}),
		fallback: false,
	}
}

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
