import { Layout } from 'components'
import useTranslation from 'next-translate/useTranslation'
import AuthorsCreate from 'views/authors/AuthorsCreate'

export default function AuthorsCreatePage() {
	const { t } = useTranslation('resources')

	return (
		<Layout
			title={`${t('common:actions.create')} ${t('authors.name_what', null, {
				fallback: t('authors.name_one'),
			})}`}
		>
			<AuthorsCreate />
		</Layout>
	)
}
