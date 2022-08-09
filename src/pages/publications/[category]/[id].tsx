import { createSSGHelpers } from '@trpc/react/ssg'
import { Layout, ListButton } from 'components'
import DeleteButton from 'components/buttons/DeleteButton'
import { useRouterQuery } from 'hooks'
import {
	GetStaticPaths,
	GetStaticPropsContext,
	InferGetStaticPropsType,
} from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { createContext } from 'server/context'
import prisma from 'server/prisma'
import { appRouter } from 'server/routers/_app'
import superjson from 'superjson'
import { trpc } from 'utils/trpc'
import PublicationsShow from 'views/publications/PublicationsShow'

const queryKey = 'publication.one'

export async function getStaticProps({
	locale,
	params,
}: GetStaticPropsContext<{ id: string }>) {
	const translationProps = await serverSideTranslations(locale!, [
		'common',
		'resources',
		'fields',
	])
	const id = params!.id
	const ssg = await createSSGHelpers({
		router: appRouter,
		ctx: createContext(),
		transformer: superjson,
	})
	let notFound = false
	try {
		await ssg.fetchQuery(queryKey, { id })
	} catch (e) {
		notFound = true
		console.error('caught error:', e)
	}
	return {
		props: {
			...translationProps,
			trpcState: ssg.dehydrate(),
			id,
		},
		notFound,
	}
}

export const getStaticPaths: GetStaticPaths = async () => {
	const records = await prisma.publication.findMany({
		select: {
			id: true,
			category: true,
		},
	})
	return {
		paths: records.map(({ id, category }) => ({
			params: {
				id: id.toString(),
				category,
			},
		})),
		fallback: 'blocking',
	}
}

export default function PublicationsShowPage({
	id,
}: InferGetStaticPropsType<typeof getStaticProps>) {
	const { t } = useTranslation('resources')
	const { category } = useRouterQuery()
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
