import { SimpleGrid, Stack, Text, TextProps } from '@chakra-ui/react'
import { Publication } from '@prisma/client'
import {
	dehydrate,
	QueryClient,
	useQuery,
	useQueryClient,
} from '@tanstack/react-query'
import { HeadTitle, Layout } from 'components'
import { GetServerSideProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { queryClientConfig } from 'pages/_app'
import { ReactNode } from 'react'

export const getServerSideProps: GetServerSideProps = async ({
	params,
	locale,
}) => {
	const translationProps = await serverSideTranslations(locale!, [
		'common',
		'fields',
	])

	const queryClient = new QueryClient(queryClientConfig)

	if (params?.id) {
		await queryClient.prefetchQuery(['publications', { id: params.id }])
	}

	return {
		props: {
			dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
			...translationProps,
		},
	}
}

interface LabeledTextProps extends TextProps {
	children: ReactNode
	label: string
}

function LabeledText({ children, label, ...props }: LabeledTextProps) {
	const { t } = useTranslation('fields')
	return (
		<Stack>
			<Text fontSize="sm" color="text-secondary">
				{t(label)}
			</Text>
			<Text {...props}>{children}</Text>
		</Stack>
	)
}

const PublicationPage: NextPage = () => {
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
			<Layout title={data.title}>
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

export default PublicationPage
