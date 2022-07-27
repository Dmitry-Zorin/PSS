import { Box, Container, Heading, HStack, Stack, Text } from '@chakra-ui/react'
import { ColorModeSwitch, CoolButtonLink, HeadTitle } from 'components'
import { GetServerSideProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export const getStaticProps: GetServerSideProps = async ({ locale }) => {
	return {
		props: await serverSideTranslations(locale!, ['index', 'common']),
	}
}

const Home: NextPage = () => {
	const { t } = useTranslation(['index', 'common'])

	return (
		<>
			<HeadTitle title={t('name', { ns: 'common' })} />
			<Stack minH="100vh">
				<HStack justify="flex-end" p={{ base: 3, md: 6 }}>
					<ColorModeSwitch />
				</HStack>
				<Stack flexGrow={1}>
					<Box flexGrow={1} />
					<Stack
						spacing={{ base: 6, md: 12 }}
						align="center"
						textAlign="center"
						p={{ base: 3, md: 6 }}
					>
						<Stack spacing={{ base: 3, md: 6 }}>
							<Heading
								as="h2"
								color="text-secondary"
								fontSize={{ base: '3xl', sm: '4xl', md: '5xl' }}
							>
								{t('welcome_to')}
							</Heading>
							<Heading
								as="h1"
								color="primary"
								fontSize={{ base: '5xl', sm: '6xl', md: '7xl' }}
								lineHeight="none"
							>
								{t('name', { ns: 'common', context: 'to' })}
							</Heading>
						</Stack>
						<Container maxW="xl" py={6}>
							<Text>{t('description', { ns: 'common' })}</Text>
						</Container>
						<Box>
							<CoolButtonLink
								to="/about"
								colorScheme="primary"
								color="bg"
								bg="text-secondary"
								rightIcon={<>&rarr;</>}
							>
								{t('get_started')}
							</CoolButtonLink>
						</Box>
					</Stack>
					<Box flexGrow={2} />
				</Stack>
				<HStack justify="center" mt="auto" p={6}>
					<Text color="text-secondary" fontSize="sm" fontWeight="light">
						© 2022 {t('author', { ns: 'common' })}
					</Text>
				</HStack>
			</Stack>
		</>
	)
}

export default Home
