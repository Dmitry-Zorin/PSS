import { List, ListItem } from '@chakra-ui/react'
import { Publication } from '@prisma/client'
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query'
import {
	HeadTitle,
	Layout,
	TimelineCard,
	TimelineCardSkeleton,
} from 'components'
import { range } from 'lodash'
import { GetServerSideProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { queryClientConfig } from './_app'

export const getStaticProps: GetServerSideProps = async ({ locale }) => {
	const queryClient = new QueryClient(queryClientConfig)
	const translationProps = await serverSideTranslations(locale!, [
		'common',
		'resources',
	])

	return {
		props: {
			dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
			...translationProps,
		},
	}
}

const TimelinePage: NextPage = () => {
	const { t } = useTranslation('common')

	const { error, data } = useQuery<Publication[], Error>([
		'publications',
		{ sort: { createdAt: 'desc' } },
	])

	const skeleton = <TimelineCardSkeleton />

	return (
		<>
			<HeadTitle title={t('timeline')} />
			<Layout error={error}>
				<List spacing={6} pt={4}>
					{data
						? data.map((e) => (
								<ListItem key={e.id}>
									<TimelineCard record={e} />
								</ListItem>
						  ))
						: range(10).map((i) => <ListItem key={i}>{skeleton}</ListItem>)}
				</List>
			</Layout>
		</>
	)
}

export default TimelinePage
