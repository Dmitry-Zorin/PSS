import { ArrowForwardIcon } from '@chakra-ui/icons'
import { Heading, HStack, Stack, Text } from '@chakra-ui/react'
import { ColorModeSwitch, CoolButtonLink } from 'components'
import { GetServerSideProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'

export const getStaticProps: GetServerSideProps = async ({ locale }) => {
	return {
		props: await serverSideTranslations(locale!, ['index', 'common']),
	}
}

const Home: NextPage = () => {
	const { t } = useTranslation(['index', 'common'])

	const header = (
		<Stack minH="50vh" justify="space-between">
			<HStack justify="flex-end" p={6}>
				<ColorModeSwitch />
			</HStack>
			<Stack
				spacing={{ base: 3, md: 6 }}
				px={6}
				pt={{ base: 0, md: 6 }}
				pb={{ base: 6, md: 12 }}
			>
				<Heading
					as="h1"
					color="text-secondary"
					fontSize={{ base: '5xl', xl: '6xl' }}
				>
					{t('welcome')}
				</Heading>
				<Heading as="h1" color="primary" fontSize={{ base: '6xl', xl: '7xl' }}>
					{t(['name_to', 'name'], { ns: 'common' })}
				</Heading>
			</Stack>
		</Stack>
	)

	const content = (
		<Stack spacing={12} flexGrow={1} p={6}>
			<div>
				<CoolButtonLink
					to="/about"
					colorScheme="secondary"
					color="bg"
					rightIcon={<ArrowForwardIcon />}
				>
					{t('button')}
				</CoolButtonLink>
			</div>
			<div>
				<Text color="text-secondary" maxW="md" m="auto">
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
