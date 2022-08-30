import { GetStaticPaths } from 'next'
import PublicationsEdit from 'views/publications/PublicationsEdit'

export const getStaticPaths: GetStaticPaths = () => {
	return {
		paths: [],
		fallback: 'blocking',
	}
}

export default function PublicationsEditPage() {
	return <PublicationsEdit />
}
