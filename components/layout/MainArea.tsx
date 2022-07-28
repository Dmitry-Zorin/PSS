import { Box, Heading } from '@chakra-ui/react'
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
		<Box pl={{ base: 6, '2xl': fullSize ? 6 : '8rem' }} pr={6}>
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
				<Box as="article" maxW={{ base: '3xl', xl: '4xl' }} mx="auto" pb={4}>
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
			)}
		</Box>
	)
}
