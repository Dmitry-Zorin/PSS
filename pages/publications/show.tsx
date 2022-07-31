import { SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { Publication } from '@prisma/client'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { LabeledText, Layout, ListButton } from 'components'
import { GetStaticProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Link from 'next/link'
import { useRouter } from 'next/router'

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

const PublicationShowPage: NextPage = () => {
	const { t } = useTranslation('resources')
	const queryClient = useQueryClient()
	const router = useRouter()

	const { category, id } = router.query as {
		category: string
		id: string
	}

	const { data } = useQuery<Publication>(['publications', { id }], {
		// initialData: () => {
		// 	return queryClient
		// 		.getQueryData<Publication[]>(['publications'], { exact: false })
		// 		?.find((e) => e.id.toString() === id)
		// },
		// initialDataUpdatedAt: () => {
		// 	return queryClient.getQueryState(['publications'], {
		// 		exact: false,
		// 	})?.dataUpdatedAt
		// },
	})

	return (
		<Layout
			headTitle={id && `${t(`${category}.name`, { count: 1 })} #${id}`}
			title={data?.title}
			rightActions={
				<Link href={`/publications/${category}`} passHref>
					<ListButton as="a" />
				</Link>
			}
		>
			{data && (
				<Stack spacing={12} pt={2}>
					<Text>{data.description}</Text>
					<SimpleGrid columns={{ base: 2, lg: 4 }} spacing={12}>
						<LabeledText label="type" text={data.type} />
						<LabeledText label="year" text={data.year} />
						<LabeledText label="character" text={data.characterId} />
						<LabeledText label="volume" text={data.pages} />
					</SimpleGrid>
					{data.outputData && (
						<LabeledText label="outputData" text={data.outputData} />
					)}
				</Stack>
			)}
		</Layout>
	)
}

export default PublicationShowPage
