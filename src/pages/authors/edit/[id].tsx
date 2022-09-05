import { GetStaticPaths } from 'next'
import AuthorsEdit from 'views/authors/AuthorsEdit'

export const getStaticPaths: GetStaticPaths = () => {
	return {
		paths: [],
		fallback: 'blocking',
	}
}

export default function AuthorsEditPage() {
	return <AuthorsEdit />
}
