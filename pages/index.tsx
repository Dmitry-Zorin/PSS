import { ArrowRightIcon } from '@chakra-ui/icons'
import { Heading, HStack, Stack, Text } from '@chakra-ui/react'
import { ColorModeSwitch, CoolButtonLink } from 'components'
import type { NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'

export async function getStaticProps({ locale }: { locale: string }) {
	return {
		props: await serverSideTranslations(locale, ['index', 'common']),
	}
}

const Home: NextPage = () => {
	const { t } = useTranslation(['index', 'common'])

	const header = (
		<Stack minH="50vh" justify="space-between">
			<HStack justify="flex-end" p={6}>
				<ColorModeSwitch />
			</HStack>
			<Heading
				as="h1"
				fontSize={{
					base: '5xl',
					lg: '6xl',
					xl: '7xl',
				}}
				lineHeight="base"
				p={6}
				pb={12}
			>
				{t('welcome')}
				<br />
				<Text as="span" color="primary.500">
					{t('name', { ns: 'common' })}
				</Text>
			</Heading>
		</Stack>
	)

	const content = (
		<Stack spacing={12} flexGrow={1} p={6}>
			<div>
				<CoolButtonLink to="/about" rightIcon={<ArrowRightIcon w={3} />}>
					{t('button')}
				</CoolButtonLink>
			</div>
			<div>
				<Text fontSize="md" color="text.secondary" maxW="sm" m="auto">
					{t('description', { ns: 'common' })}
				</Text>
			</div>
		</Stack>
	)

	const footer = (
		<HStack justify="center" mt="auto" p={6}>
			<Text fontSize="sm" fontWeight="light" color="gray.500">
				© 2022 {t('author', { ns: 'common' })}
			</Text>
		</HStack>
	)

	return (
		<>
			<Head>
				<title>{t('name', { ns: 'common' })}</title>
				<meta name="description" content={t('description', { ns: 'common' })} />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Stack minH="100vh" spacing={6} textAlign="center">
				{header}
				{content}
				{footer}
			</Stack>
		</>
	)
}

export default Home
