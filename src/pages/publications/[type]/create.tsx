import resources from 'constants/resources'
import { GetStaticPaths } from 'next'
import PublicationsCreate from 'views/publications/PublicationsCreate'

export const getStaticPaths: GetStaticPaths = () => {
	return {
		paths: Object.keys(resources.publications.items).flatMap((type) => {
			return ['ru', 'en'].map((locale) => ({
				params: { type },
				locale,
			}))
		}),
		fallback: false,
	}
}

export default function PublicationsCreatePage() {
	return <PublicationsCreate />
}
