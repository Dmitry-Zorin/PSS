import { Layout } from 'components'
import resources from 'constants/resources'
import { useUrlParams } from 'hooks'
import { GetStaticPaths } from 'next'
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

export default function PublicationsCreatePage() {
	const { t } = useTranslation('resources')
	const { category } = useUrlParams()

	return (
		<Layout
			title={
				category &&
				`${t('common:actions.create')} ${t(`${category}.name_what`, null, {
					fallback: t(`${category}.name_one`),
				})}`
			}
		>
			<PublicationsCreate />
		</Layout>
	)
}
