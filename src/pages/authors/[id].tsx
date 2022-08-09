import { Layout, ListButton } from 'components'
import { useGetOne } from 'hooks'
import { GetServerSideProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
	const translationProps = await serverSideTranslations(locale!, [
		'common',
		'resources',
		'fields',
	])
	return {
		props: translationProps,
	}
}

const AuthorsShowPage: NextPage = () => {
	const { t } = useTranslation('resources')
	const router = useRouter()

	const { id } = router.query as {
		id: string
	}

	const { error, data } = useGetOne('author', id)

	return (
		<Layout
			error={error}
			headTitle={id && `${t(`authors.name`, { count: 1 })} #${id}`}
			// title={data && getAuthorFullName(data)}
			leftActions={<ListButton href={'/authors'} />}
		>
			{/* <AuthorsShow data={data} /> */}
		</Layout>
	)
}

export default AuthorsShowPage
