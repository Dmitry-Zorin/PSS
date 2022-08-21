import { Center, Divider, Heading, HStack, Stack, Text } from '@chakra-ui/react'
import { Head, Logo } from 'components'
import useTranslation from 'next-translate/useTranslation'

export default function Error500Page() {
	const { t } = useTranslation()
	return (
		<>
			<Head title="500" />
			<HStack p={6}>
				<Logo />
			</HStack>
			<Center w="100vw" minH="60vh" px={6}>
				<Stack spacing={12} align="center">
					<HStack spacing={6} h={16} mb={6}>
						<Heading as="h1" size="4xl" py={3}>
							500
						</Heading>
						<Divider orientation="vertical" />
						<div>
							<Heading as="h2" size="md">
								{t('errors.500')}
							</Heading>
						</div>
					</HStack>
					<Text fontSize="4xl" color="text-secondary">
						¯\_( ✖ ෴ ✖ )_/¯
					</Text>
				</Stack>
			</Center>
		</>
	)
}
