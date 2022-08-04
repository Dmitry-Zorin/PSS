import { Box, Heading, HStack } from '@chakra-ui/react'
import { ActionsToolbar } from 'components'
import { useTranslation } from 'next-i18next'
import { ReactNode } from 'react'

export interface MainAreaProps {
	error?: Error | null
	children: ReactNode
	title?: string
	leftActions?: ReactNode
	rightActions?: ReactNode
	fullSize?: boolean
}

export default function MainArea({
	children,
	error,
	title,
	leftActions,
	rightActions,
	fullSize,
}: MainAreaProps) {
	const { t } = useTranslation('common')

	const heading = error ? t('error') : title

	return (
		<Box px={6}>
			{(leftActions || rightActions) && (
				<ActionsToolbar
					leftActions={leftActions}
					rightActions={rightActions}
					pl={{ '2xl': fullSize ? 0 : '8.5rem' }}
				/>
			)}
			{fullSize ? (
				children
			) : (
				<HStack pb={4} pr={{ base: 0, '2xl': '16rem' }}>
					<Box flexGrow={1} />
					<Box as="article" w="full" maxW={{ base: '3xl', xl: '4xl' }}>
						{heading && (
							<Box as="header" pb={8}>
								<Heading
									as="h1"
									fontSize={{ base: '5xl', xl: '6xl' }}
									lineHeight="none"
								>
									{heading}
								</Heading>
							</Box>
						)}
						{error ? (
							<Heading as="h2" size="lg" color="red.500">
								{error.message}
							</Heading>
						) : (
							<Box maxW="3xl">{children}</Box>
						)}
					</Box>
					<Box flexGrow={{ base: 2, '2xl': 1 }} />
				</HStack>
			)}
		</Box>
	)
}
