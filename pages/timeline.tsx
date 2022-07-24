import {
	Avatar,
	Button,
	List,
	ListItem,
	SkeletonCircle,
	SkeletonText,
	Stack,
	Text,
} from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Publication } from '@prisma/client'
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query'
import {
	Card,
	CardContent,
	CardHeader,
	HeadTitle,
	Layout,
	Truncate,
} from 'components'
import resources from 'constants/resources'
import { range } from 'lodash'
import { GetServerSideProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Link from 'next/link'

async function getTimelineItems() {
	const res = await fetch('/api/timeline')
	return res.json()
}

export const getStaticProps: GetServerSideProps = async ({ locale }) => {
	const queryClient = new QueryClient()
	await queryClient.prefetchQuery(['timeline'], getTimelineItems)

	return {
		props: {
			...(await serverSideTranslations(locale!, ['common', 'resources'])),
			dehydratedState: dehydrate(queryClient),
		},
	}
}

interface ListItemCardProps {
	record: Publication
}

function ListItemCard({ record }: ListItemCardProps) {
	const { t, i18n } = useTranslation('resources')

	return (
		<Card>
			<CardHeader>
				<Avatar
					bg="bg-layer-1"
					color="text-secondary"
					icon={
						<FontAwesomeIcon
							icon={
								resources.publications[
									record.category as keyof typeof resources['publications']
								].icon
							}
							size="lg"
						/>
					}
				/>
				<Stack flexGrow={1} spacing={0}>
					<Text fontSize="md" color="text-secondary-on-layer-2">
						{t(`${record.category}.name`, { count: 1 })}
					</Text>
					<Text fontSize="sm" color="text-secondary">
						{new Date(record.createdAt).toLocaleString(i18n.language, {
							day: 'numeric',
							month: 'long',
							year: 'numeric',
						})}
					</Text>
				</Stack>
				<Link
					href={{
						pathname: `/publications/[category]/[id]`,
						query: {
							category: record.category,
							id: record.id,
							record: JSON.stringify(record),
						},
					}}
					as={`/publications/${record.category}/${record.id}`}
					passHref
				>
					<Button
						as="a"
						variant="ghost"
						color="text-secondary"
						colorScheme="dark"
					>
						View
					</Button>
				</Link>
			</CardHeader>
			<CardContent>
				<Text>{record.title}</Text>
				{record.description && (
					<Truncate>
						<Text fontSize="md" color="text-secondary">
							{record.description}
						</Text>
					</Truncate>
				)}
			</CardContent>
		</Card>
	)
}

const TimelinePage: NextPage = () => {
	const { t } = useTranslation('common')
	const { data: publications } = useQuery<Publication[]>(
		['timeline'],
		getTimelineItems,
	)

	return (
		<>
			<HeadTitle title={t('timeline')} />
			<Layout>
				<List spacing={6} pt={4}>
					{publications
						? publications.map((e) => (
								<ListItem key={e.id}>
									<ListItemCard record={e} />
								</ListItem>
						  ))
						: range(3).map((i) => (
								<Card key={i}>
									<CardHeader>
										<SkeletonCircle boxSize={10} />
										<Stack spacing={3} flexGrow={1}>
											<SkeletonText noOfLines={1} w={12} />
											<SkeletonText noOfLines={1} w="6rem" />
										</Stack>
										<SkeletonText noOfLines={1} w={12} p={2} />
									</CardHeader>
									<CardContent>
										<SkeletonText noOfLines={1} py={2} />
										<SkeletonText noOfLines={5} spacing={3} />
									</CardContent>
								</Card>
						  ))}
				</List>
			</Layout>
		</>
	)
}

export default TimelinePage
