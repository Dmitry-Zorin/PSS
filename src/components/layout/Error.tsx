import {
	Box,
	Center,
	Divider,
	Heading,
	HStack,
	Stack,
	Text,
} from '@chakra-ui/react'
import { BackButton, Head, Logo } from 'components'
import useTranslation from 'next-translate/useTranslation'

interface ErrorProps {
	status: number
	message: string
}

export default function Error({ status, message }: ErrorProps) {
	const { t } = useTranslation()
	return (
		<>
			<Head title={status.toString()} />
			<Stack minH="100vh" bg="bg">
				<HStack p={4}>
					<Logo />
				</HStack>
				<Stack flexGrow={1}>
					<Box flexGrow={1} />
					<Center px={6} pb={16}>
						<Stack spacing={16} align="center">
							<HStack spacing={6} h={16}>
								<Heading as="h1" size="4xl" py={3}>
									{status}
								</Heading>
								<Divider orientation="vertical" />
								<Heading as="h2" size="md">
									{t(`errors.${status}`)}
								</Heading>
							</HStack>
							<Text fontSize="4xl" color="text-secondary">
								{message}
							</Text>
							<BackButton variant="main" />
						</Stack>
					</Center>
					<Box flexGrow={2} />
				</Stack>
			</Stack>
		</>
	)
}
