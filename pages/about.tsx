import { Heading, Stack, Text } from '@chakra-ui/react'
import { HeadTitle, Layout } from 'components'
import { GetServerSideProps, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'react-i18next'

export const getStaticProps: GetServerSideProps = async ({ locale }) => {
	return {
		props: await serverSideTranslations(locale!, ['about', 'common', 'menu']),
	}
}

const AboutPage: NextPage = () => {
	const { t } = useTranslation('about')

	return (
		<>
			<HeadTitle title={t('title')} />
			<Layout title={t('title')}>
				<Heading as="h2" size="xl">
					{t('subtitle')}
				</Heading>
				{(
					t('paragraphs', { returnObjects: true }) as {
						title: string
						text: string
					}[]
				).map(({ title, text }) => (
					<Stack as="section" spacing={3} key={title} pt={10}>
						<Heading as="h3" fontSize="2xl" fontWeight="semibold">
							{title}
						</Heading>
						<Text>{text}</Text>
					</Stack>
				))}
			</Layout>
		</>
	)
}

export default AboutPage
