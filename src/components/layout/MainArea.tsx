import { Box, Heading, Stack } from '@chakra-ui/react'
import { ActionsToolbar } from 'components'
import { isString } from 'lodash'
import useTranslation from 'next-translate/useTranslation'
import { ReactNode } from 'react'

export interface MainAreaProps {
	error?: unknown
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
	const { t } = useTranslation()
	const shouldShowActions = leftActions || rightActions

	const heading = error ? t('error') : title

	return (
		<>
			{shouldShowActions && (
				<ActionsToolbar leftActions={leftActions} rightActions={rightActions} />
			)}
			<Box px={2} pb={16}>
				{fullSize ? (
					children
				) : (
					<Box mr={{ '2xl': fullSize ? 0 : 32 }}>
						<Box maxW={{ base: '3xl', lg: '4xl' }} mx="auto">
							<Stack
								as="article"
								spacing={{ base: 8, sm: 10 }}
								maxW={{ base: '3xl', '2xl': '4xl' }}
								w="full"
								mx="auto"
							>
								{heading && (
									<Heading
										as="h1"
										fontSize={{ base: '3xl', sm: '5xl', '2xl': '6xl' }}
										lineHeight={{ base: 'shorter', md: 'none' }}
										pt={{ base: 6, md: shouldShowActions ? 6 : 0 }}
									>
										{heading}
									</Heading>
								)}
								{error ? (
									<Heading as="h2" size="lg" color="red.500">
										{error instanceof Error
											? error.message
											: isString(error)
											? error
											: t('errors.unknown')}
									</Heading>
								) : (
									<Box maxW="3xl">{children}</Box>
								)}
							</Stack>
						</Box>
					</Box>
				)}
			</Box>
		</>
	)
}
