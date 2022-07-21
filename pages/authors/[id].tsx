import { Stack, Text, TextProps } from '@chakra-ui/react'
import { Author } from '@prisma/client'
import { HeadTitle, Layout } from 'components'
import prisma from 'lib/prisma'
import { GetServerSideProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { ReactNode } from 'react'
import { getAuthorFullName } from 'scripts/authors'

export const getServerSideProps: GetServerSideProps = async ({
	query,
	locale,
}) => {
	if (typeof query.id !== 'string') {
		throw new Error('Whut?!')
	}
	const author = await prisma.author.findUniqueOrThrow({
		where: {
			id: +query.id,
		},
	})
	return {
		props: {
			author,
			...(await serverSideTranslations(locale!, [
				'resources',
				'common',
				'fields',
			])),
		},
	}
}

interface LabeledTextProps extends TextProps {
	children: ReactNode
	label: string
}

const AuthorPage: NextPage<{
	author: Author
}> = ({ author }) => {
	const { t } = useTranslation(['resources', 'common', 'fields'])

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
