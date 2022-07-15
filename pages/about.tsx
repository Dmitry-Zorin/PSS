import { Heading, Stack, Text } from '@chakra-ui/react'
import { NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'react-i18next'
import { MainArea } from '~/components'
import { Layout } from '~/layout'

export async function getStaticProps({ locale }: { locale: string }) {
	return {
		props: await serverSideTranslations(locale, ['about']),
	}
}

const About: NextPage = () => {
	const { t } = useTranslation('about')

	return (
		<Layout>
			<MainArea title={t('title')}>
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
			</MainArea>
		</Layout>
	)
}

export default About
