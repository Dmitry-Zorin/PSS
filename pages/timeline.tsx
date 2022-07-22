import {
	Avatar,
	Button,
	List,
	ListItem,
	Stack,
	Text,
	useColorModeValue,
} from '@chakra-ui/react'
import { Publication } from '@prisma/client'
import {
	Card,
	CardContent,
	CardHeader,
	HeadTitle,
	Layout,
	Truncate,
} from 'components'
import resources from 'constants/resources'
import prisma from 'lib/prisma'
import { GetServerSideProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Link from 'next/link'
import { stdout } from 'process'
import { parse, stringify } from 'superjson'

interface TimelinePageProps {
	publications?: Publication[]
}

export const getServerSideProps: GetServerSideProps<
	TimelinePageProps
> = async ({ res, locale }) => {
	res.setHeader(
		'Cache-Control',
		'public, s-maxage=10, stale-while-revalidate=59',
	)
	try {
		const publications = await prisma.publication.findMany({
			orderBy: {
				createdAt: 'desc',
			},
			take: 10,
			skip: 0,
		})
		return {
			props: {
				publications: parse(stringify(publications)),
				...(await serverSideTranslations(locale!, ['common', 'resources'])),
			},
		}
	} catch (e: any) {
		stdout.write(e.toString())
		return {
			props: {},
		}
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
					bg="bg-50"
					borderY="1px"
					borderTopColor={useColorModeValue('transparent', 'border')}
					borderBottomColor={useColorModeValue('border', 'transparent')}
					icon={
						resources.publications[
							record.category as keyof typeof resources['publications']
						].icon
					}
				/>
				<Stack flexGrow={1} spacing={0}>
					<Text fontSize="md">
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
				<Link href={`/publications/${record.category}/${record.id}`} passHref>
					<Button
						as="a"
						variant="ghost"
						colorScheme="dark"
						color="text-secondary"
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

const TimelinePage: NextPage<TimelinePageProps> = ({ publications }) => {
	const { t } = useTranslation('common')

	return (
		<>
			<HeadTitle title={t('timeline')} />
			<Layout>
				{publications && (
					<List spacing={6} pt={4}>
						{publications?.map((e) => (
							<ListItem key={e.id}>
								<ListItemCard record={e} />
							</ListItem>
						))}
					</List>
				)}
			</Layout>
		</>
	)
}

export default TimelinePage
