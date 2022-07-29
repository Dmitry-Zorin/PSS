import { Button, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { faTableList } from '@fortawesome/free-solid-svg-icons'
import { Publication } from '@prisma/client'
import {
	dehydrate,
	QueryClient,
	useQuery,
	useQueryClient,
} from '@tanstack/react-query'
import { HeadTitle, Icon, LabeledText, Layout } from 'components'
import { GetStaticProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Link from 'next/link'
import { useRouter } from 'next/router'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	const translationProps = await serverSideTranslations(locale!, [
		'common',
		'fields',
	])

	const queryClient = new QueryClient()

	return {
		props: {
			dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
			...translationProps,
		},
	}
}

const PublicationShowPage: NextPage = () => {
	const { t } = useTranslation('common')
	const queryClient = useQueryClient()
	const router = useRouter()

	const { category, id } = router.query as {
		category: string
		id: string
	}

	const { data } = useQuery<Publication>(['publications', { id }], {
		initialData: () => {
			return queryClient
				.getQueryData<Publication[]>(['publications'], { exact: false })
				?.find((e) => e.id.toString() === id)
		},
		initialDataUpdatedAt: () => {
			return queryClient.getQueryState(['publications'], {
				exact: false,
			})?.dataUpdatedAt
		},
	})

	if (!data) {
		return null
	}

	return (
		<>
			<HeadTitle title={`${t(category)} #${data.id}`} />
			<Layout
				title={data.title}
				leftActions={
					<Link href={`/publications/${category}`} passHref>
						<Button as="a" leftIcon={<Icon icon={faTableList} />}>
							List
						</Button>
					</Link>
				}
			>
				<Stack spacing={12} pt={2}>
					<Text>{data.description}</Text>
					<SimpleGrid columns={{ base: 2, lg: 4 }} spacing={12}>
						<LabeledText label="type">{data.type ?? '-'}</LabeledText>
						<LabeledText label="year">{data.year ?? '-'}</LabeledText>
						<LabeledText label="character">
							{data.characterId ?? '-'}
						</LabeledText>
						<LabeledText label="volume">{data.pages ?? '-'}</LabeledText>
						{/* <LabeledText label="authors">{data.authors}</LabeledText> */}
						{/* <LabeledText label="coauthors">{data.coauthors}</LabeledText> */}
					</SimpleGrid>
					{data.outputData && (
						<LabeledText label="outputData">{data.outputData}</LabeledText>
					)}
				</Stack>
			</Layout>
		</>
	)
}

export default PublicationShowPage
