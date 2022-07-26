import { Stack, Text, TextProps } from '@chakra-ui/react'
import { HeadTitle, Layout } from 'components'
import { GetServerSideProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import { getAuthorFullName } from 'scripts/authors'

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
	return {
		props: await serverSideTranslations(locale!, ['common', 'fields']),
	}
}

interface LabeledTextProps extends TextProps {
	children: ReactNode
	label: string
}

const AuthorPage: NextPage = () => {
	const { t } = useTranslation(['common', 'fields'])
	const router = useRouter()
	const { record } = router.query as {
		record: string
	}

	const author = JSON.parse(record)

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
			<HeadTitle title={`${t('authors.name', { count: 1 })} #${author.id}`} />
			<Layout title={getAuthorFullName(author)}>
				<LabeledText label="info">{author.info ?? '-'}</LabeledText>
			</Layout>
		</>
	)
}

export default AuthorPage
