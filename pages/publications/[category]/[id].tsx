import { SimpleGrid, Stack, Text, TextProps } from '@chakra-ui/react'
import { HeadTitle, Layout } from 'components'
import { GetServerSideProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
	return {
		props: await serverSideTranslations(locale!, ['common', 'fields']),
	}
}

interface LabeledTextProps extends TextProps {
	children: ReactNode
	label: string
}

const PublicationPage: NextPage = () => {
	const router = useRouter()
	const { category, record } = router.query as {
		category: string
		record: string
	}
	const { t } = useTranslation(['common', 'fields'])

	function LabeledText({ children, label, ...props }: LabeledTextProps) {
		return (
			<Stack>
				<Text fontSize="sm" color="secondary">
					{t(label)}
				</Text>
				<Text fontWeight="medium" color="text-secondary" {...props}>
					{children}
				</Text>
			</Stack>
		)
	}

	const p = JSON.parse(record)

	return (
		<>
			<HeadTitle title={`${t(category)} #${p.id}`} />
			<Layout title={p.title}>
				<Stack spacing={12}>
					<Text>{p.description}</Text>
					<SimpleGrid columns={{ base: 2, lg: 4 }} spacing={12}>
						<LabeledText label="type">{p.type ?? '-'}</LabeledText>
						<LabeledText label="year">{p.year ?? '-'}</LabeledText>
						<LabeledText label="character">{p.characterId ?? '-'}</LabeledText>
						<LabeledText label="volume">{p.pages ?? '-'}</LabeledText>
						{/* <LabeledText label="authors">{p.authors}</LabeledText> */}
						{/* <LabeledText label="coauthors">{p.coauthors}</LabeledText> */}
					</SimpleGrid>
					{p.outputData && (
						<LabeledText label="outputData">{p.outputData}</LabeledText>
					)}
				</Stack>
			</Layout>
		</>
	)
}

export default PublicationPage
