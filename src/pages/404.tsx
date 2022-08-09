import { Center, Divider, Heading, HStack, Stack, Text } from '@chakra-ui/react'
import { CoolButtonLink, Head, Logo } from 'components'
import { GetServerSideProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export const getStaticProps: GetServerSideProps = async ({ locale }) => {
	return {
		props: await serverSideTranslations(locale!, ['common']),
	}
}

const Error404Page: NextPage = () => {
	const { t } = useTranslation('common')
	return (
		<>
			<Head title="404" />
			<HStack p={6}>
				<Logo />
			</HStack>
			<Center w="100vw" minH="60vh" px={6}>
				<Stack spacing={12} align="center">
					<HStack spacing={6} h={16} mb={6}>
						<Heading as="h1" size="4xl" py={3}>
							404
						</Heading>
						<Divider orientation="vertical" />
						<div>
							<Heading as="h2" size="md">
								{t('errors.404.name')}
							</Heading>
						</div>
					</HStack>
					<Text fontSize="4xl" color="text-secondary">
						{t('errors.404.face')}
					</Text>
					<div>
						<CoolButtonLink
							to="/about"
							colorScheme="primary"
							color="bg"
							bg="text-secondary"
						>
							{t('actions.retry')}
						</CoolButtonLink>
					</div>
				</Stack>
			</Center>
		</>
	)
}

export default Error404Page
