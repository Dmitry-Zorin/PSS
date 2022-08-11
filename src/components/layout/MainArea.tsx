import { Box, Heading } from '@chakra-ui/react'
import { TRPCClientErrorLike } from '@trpc/client'
import { ActionsToolbar } from 'components'
import useTranslation from 'next-translate/useTranslation'
import { ReactNode } from 'react'
import { AppRouter } from 'server/routers/_app'

export interface MainAreaProps {
	error?: TRPCClientErrorLike<AppRouter> | null
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
		<Box px={4} pb={6}>
			{(leftActions || rightActions) && (
				<ActionsToolbar leftActions={leftActions} rightActions={rightActions} />
			)}
			{fullSize ? (
				children
			) : (
				<Box px={4} mr={{ '2xl': fullSize ? 0 : 32 }}>
					<Box maxW={{ base: '3xl', lg: '4xl' }} mx="auto">
						<Box
							as="article"
							maxW={{ base: '3xl', '2xl': '4xl' }}
							w="full"
							mx="auto"
						>
							{heading && (
								<Box as="header" pb={10}>
									<Heading
										as="h1"
										fontSize={{ base: '5xl', '2xl': '6xl' }}
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
					</Box>
				</Box>
			)}
		</Box>
	)
}
