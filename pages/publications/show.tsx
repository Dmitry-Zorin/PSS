import { Layout, ListButton } from 'components'
import DeleteButton from 'components/buttons/DeleteButton'
import { useGetOne } from 'hooks'
import { GetStaticProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { trpc } from 'utils/trpc'
import PublicationsShow from 'views/publications/PublicationsShow'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	const translationProps = await serverSideTranslations(locale!, [
		'common',
		'resources',
		'fields',
	])
	return {
		props: translationProps,
	}
}

const PublicationsShowPage: NextPage = () => {
	const { t } = useTranslation('resources')
	const router = useRouter()
	const trcpContext = trpc.useContext()

	const { category, id } = router.query as {
		category: string
		id: string
	}

	const { error, data } = useGetOne('publication', id)

	const mutation = trpc.useMutation(['publication.delete'], {
		async onSuccess() {
			trcpContext.invalidateQueries(['publication.list'])
			router.replace(`/publications/${category}`)
		},
	})

	return (
		<Layout
			error={error}
			headTitle={id && `${t(`${category}.name`, { count: 1 })} #${id}`}
			// title={data?.title}
			leftActions={<ListButton href={`/publications/${category}`} />}
			rightActions={<DeleteButton onClick={() => mutation.mutate({ id })} />}
		>
			<PublicationsShow data={data} />
		</Layout>
	)
}

export default PublicationsShowPage
