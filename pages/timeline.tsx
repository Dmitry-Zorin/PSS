import { Avatar, HStack, List, ListItem, Stack, Text } from '@chakra-ui/react'
import { Publication } from '@prisma/client'
import { HeadTitle, Layout } from 'components'
import prisma from 'lib/prisma'
import { GetServerSideProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import NextLink from 'next/link'
import { stdout } from 'process'
import resources from 'resources/resources'
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
		console.log(publications)
		return {
			props: {
				publications: parse(stringify(publications)),
				...(await serverSideTranslations(locale!, [
					'common',
					'menu',
					'fields',
				])),
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
	const { t, i18n } = useTranslation(['common'])

	return (
		<NextLink href={`publications/articles/${record.id}`}>
			<Stack
				spacing={2}
				cursor="pointer"
				borderRadius="lg"
				px={6}
				py={4}
				bg="bg-50"
				_hover={{
					bg: 'bg-100',
				}}
			>
				<HStack spacing={4}>
					<Avatar
						bg="bg-secondary"
						icon={resources.publications.articles.icon}
					/>
					<Stack flexGrow={1} spacing={0}>
						<Text fontSize="md">{t(record.type)}</Text>
						<Text fontSize="sm" color="text-secondary">
							{new Date(record.createdAt).toLocaleString(i18n.language, {
								day: 'numeric',
								month: 'long',
								year: 'numeric',
							})}
						</Text>
					</Stack>
				</HStack>
				<Text>{record.title}</Text>
			</Stack>
		</NextLink>
	)
}

const TimelinePage: NextPage<TimelinePageProps> = ({ publications }) => {
	const { t } = useTranslation('menu')

	return (
		<>
			<HeadTitle title={t('timeline')} />
			<Layout>
				{publications && (
					<List spacing={6}>
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
