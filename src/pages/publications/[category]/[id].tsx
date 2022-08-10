import { createSSGHelpers } from '@trpc/react/ssg'
import { Layout, ListButton } from 'components'
import DeleteButton from 'components/buttons/DeleteButton'
import { useRouterQuery } from 'hooks'
import { GetServerSidePropsContext } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { createContext } from 'server/context'
import { appRouter } from 'server/routers/_app'
import superjson from 'superjson'
import { trpc } from 'utils/trpc'
import PublicationsShow from 'views/publications/PublicationsShow'

const queryKey = 'publication.one'

export async function getServerSideProps({
	locale,
	params,
}: GetServerSidePropsContext<{ id: string }>) {
	const translationProps = await serverSideTranslations(locale!, [
		'common',
		'resources',
		'fields',
	])
	const ssg = await createSSGHelpers({
		router: appRouter,
		ctx: createContext(),
		transformer: superjson,
	})
	await ssg.fetchQuery(queryKey, { id: params!.id })
	return {
		props: {
			...translationProps,
			trpcState: ssg.dehydrate(),
		},
	}
}

export default function PublicationsShowPage() {
	const { t } = useTranslation('resources')
	const { id, category } = useRouterQuery()
	const router = useRouter()
	const trcpContext = trpc.useContext()

	const { error, data } = trpc.useQuery([queryKey, { id }])

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
			title={data?.title}
			leftActions={<ListButton href={`/publications/${category}`} />}
			rightActions={<DeleteButton onClick={() => mutation.mutate({ id })} />}
		>
			{!!data && <PublicationsShow data={data} />}
		</Layout>
	)
}
