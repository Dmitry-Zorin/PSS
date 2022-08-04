import { Box, Container, Heading, HStack, Stack, Text } from '@chakra-ui/react'
import { ColorModeSwitch, CoolButtonLink } from 'components'
import { useTranslation } from 'next-i18next'

export default function Index() {
	const { t } = useTranslation(['common', 'index'])

	return (
		<Stack minH="100vh" bg="bg">
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
							{t('welcome_to', { ns: 'index' })}
						</Heading>
						<Heading
							as="h1"
							color="primary"
							fontSize={{ base: '5xl', sm: '6xl', md: '7xl' }}
							lineHeight="none"
						>
							{t('name', { context: 'to' })}
						</Heading>
					</Stack>
					<Container maxW="xl" py={6}>
						<Text>{t('description')}</Text>
					</Container>
					<Box>
						<CoolButtonLink
							to="/about"
							colorScheme="primary"
							color="bg"
							bg="text-secondary"
							rightIcon={<>&rarr;</>}
						>
							{t('get_started', { ns: 'index' })}
						</CoolButtonLink>
					</Box>
				</Stack>
				<Box flexGrow={2} />
			</Stack>
			<HStack justify="center" mt="auto" p={6}>
				<Text color="text-secondary" fontSize="xs" fontWeight="light">
					© 2022 {t('author')}
				</Text>
			</HStack>
		</Stack>
	)
}
