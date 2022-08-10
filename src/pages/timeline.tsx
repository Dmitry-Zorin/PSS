import { createSSGHelpers } from '@trpc/react/ssg'
import { Layout } from 'components'
import { GetServerSideProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { createContext } from 'server/context'
import { appRouter } from 'server/routers/_app'
import superjson from 'superjson'
import { trpc } from 'utils/trpc'
import TimelineView from 'views/timeline/Timeline'

const queryKey = 'publication.list'

const queryParams = {
	sortField: 'createdAt',
	sortOrder: 'desc',
} as const

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
	const translationProps = await serverSideTranslations(locale!, [
		'common',
		'resources',
	])
	const ssg = await createSSGHelpers({
		router: appRouter,
		ctx: createContext(),
		transformer: superjson,
	})
	await ssg.fetchQuery(queryKey, queryParams)
	return {
		props: {
			...translationProps,
			trpcState: ssg.dehydrate(),
		},
		headers: {
			'cache-control': `s-maxage=1, stale-while-revalidate=${
				30 * 24 * 60 * 60
			}`,
		},
	}
}

const TimelinePage: NextPage = () => {
	const { t } = useTranslation('common', { keyPrefix: 'menu.items' })

	const { error, data } = trpc.useQuery([queryKey, queryParams])

	return (
		<Layout title={t('timeline')} error={error}>
			<TimelineView data={data!} />
		</Layout>
	)
}

export default TimelinePage
