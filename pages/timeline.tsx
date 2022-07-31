import { List, ListItem } from '@chakra-ui/react'
import { Publication } from '@prisma/client'
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query'
import { Layout } from 'components'
import { queryClientConfig } from 'lib/common'
import { range } from 'lodash'
import { GetServerSideProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { TimelineCard, TimelineCardSkeleton } from 'views'

export const getStaticProps: GetServerSideProps = async ({ locale }) => {
	const queryClient = new QueryClient(queryClientConfig)
	const translationProps = await serverSideTranslations(locale!, [
		'common',
		'resources',
	])

	// await queryClient.prefetchQuery([
	// 	'publications',
	// 	{ sort: { createdAt: 'desc' } },
	// ])

	return {
		props: {
			dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
			...translationProps,
		},
	}
}

const TimelinePage: NextPage = () => {
	const { t } = useTranslation('common', { keyPrefix: 'menu.items' })

	const { error, data } = useQuery<
		{ publications: Publication[]; total: number },
		Error
	>(['publications', { sort: { createdAt: 'desc' } }])

	const skeleton = <TimelineCardSkeleton />

	return (
		<Layout title={t('timeline')} error={error}>
			<List spacing={9}>
				{data
					? data.publications.map((e) => (
							<ListItem key={e.id}>
								<TimelineCard record={e} />
							</ListItem>
					  ))
					: range(10).map((i) => <ListItem key={i}>{skeleton}</ListItem>)}
			</List>
		</Layout>
	)
}

export default TimelinePage
