import { SimpleGrid, Stack, Text, TextProps } from '@chakra-ui/react'
import { Publication } from '@prisma/client'
import { HeadTitle, Layout } from 'components'
import prisma from 'lib/prisma'
import { GetServerSideProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'

export const getServerSideProps: GetServerSideProps = async ({
	query,
	locale,
}) => {
	if (typeof query.id !== 'string') {
		throw new Error('Whut?!')
	}
	const publication = await prisma.publication.findUniqueOrThrow({
		where: {
			id: +query.id,
		},
	})
	return {
		props: {
			publication,
			...(await serverSideTranslations(locale!, ['common', 'menu', 'fields'])),
		},
	}
}

interface LabeledTextProps extends TextProps {
	children: ReactNode
	label: string
}

const PublicationPage: NextPage<{
	publication: Publication
}> = ({ publication: p }) => {
	const router = useRouter()
	const { type } = router.query as { type: string }
	const { t } = useTranslation(['common', 'menu', 'fields'])

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

	return (
		<>
			<HeadTitle title={`${t(type, { ns: 'menu' })} #${p.id}`} />
			<Layout title={p.title}>
				<Stack spacing={12}>
					<Text>{p.description}</Text>
					<SimpleGrid columns={{ base: 2, lg: 4 }} spacing={12}>
						<LabeledText label="type">{p.type ?? '-'}</LabeledText>
						<LabeledText label="year">{p.year ?? '-'}</LabeledText>
						<LabeledText label="character">{p.characterId ?? '-'}</LabeledText>
						<LabeledText label="volume">{p.volume ?? '-'}</LabeledText>
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
