import { Heading, Stack, Text } from '@chakra-ui/react'
import { Layout } from 'layout'
import { NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import { useTranslation } from 'react-i18next'

export async function getStaticProps({ locale }: { locale: string }) {
	return {
		props: await serverSideTranslations(locale, ['about', 'common']),
	}
}

const About: NextPage = () => {
	const { t } = useTranslation(['about', 'common'])

	return (
		<>
			<Head>
				<title>
					{t('title')} | {t('name', { ns: 'common' })}
				</title>
			</Head>
			<Layout title={t('title')}>
				<Heading as="h2" size="xl" textAlign="center" color="secondary.300">
					{t('subtitle')}
				</Heading>
				{(
					t('paragraphs', { returnObjects: true }) as {
						title: string
						text: string
					}[]
				).map(({ title, text }) => (
					<Stack spacing={2} key={title} pt={10}>
						<Heading as="h4" size="md" fontWeight={500} color="primary.500">
							{title}
						</Heading>
						<Text>{text}</Text>
					</Stack>
				))}
			</Layout>
		</>
	)
}

export default About
