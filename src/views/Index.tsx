import { Box, Container, Heading, HStack, Stack, Text } from '@chakra-ui/react'
import { Button, ColorModeMenu, LanguageMenu } from 'components'
import useTranslation from 'next-translate/useTranslation'

export default function Index() {
	const { t } = useTranslation()

	return (
		<Stack spacing={4} minH="100vh" bg="bg" px={{ base: 2, md: 4 }} py={4}>
			<HStack spacing={0} justify="flex-end">
				<LanguageMenu />
				<ColorModeMenu />
			</HStack>
			<Stack flexGrow={1}>
				<Box flexGrow={1} />
				<Stack spacing={{ base: 10, md: 12 }} align="center" textAlign="center">
					<Stack>
						<Heading
							as="h2"
							color="text-secondary"
							fontSize={{ base: '3xl', sm: '4xl', md: '5xl' }}
						>
							{t('index:welcome_to')}
						</Heading>
						<Heading
							as="h1"
							color="primary"
							fontSize={{ base: '5xl', sm: '6xl', md: '7xl' }}
							lineHeight="none"
						>
							{t('name_to', null, { fallback: 'name' })}
						</Heading>
					</Stack>
					<Container maxW="xl">
						<Text>{t('description')}</Text>
					</Container>
					<Box>
						<Button href="/about" variant="main" rightIcon={<>&rarr;</>}>
							{t('get_started', null, { ns: 'index' })}
						</Button>
					</Box>
				</Stack>
				<Box flexGrow={2} />
			</Stack>
			<HStack justify="center">
				<Text color="text-secondary" fontSize="sm" fontWeight="light">
					© 2022 {t('author')}
				</Text>
			</HStack>
		</Stack>
	)
}
