import resources from 'constants/resources'
import { GetStaticPaths } from 'next'
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
	return <PublicationsCreate />
}
