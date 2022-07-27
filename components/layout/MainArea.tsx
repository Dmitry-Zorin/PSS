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
	fullSize = false,
}: MainAreaProps) {
	const { t } = useTranslation('common')
	const heading = error ? t('error') : title

	return (
		<Box as="main" px={4}>
			{(leftActions || rightActions) && (
				<ActionsToolbar leftActions={leftActions} rightActions={rightActions} />
			)}
			{fullSize ? (
				children
			) : (
				<Box maxW="3xl" mx="auto" pb={16}>
					{heading && (
						<Box as="header" pt={8} pb={12}>
							<Heading
								as="h3"
								fontSize="3.25rem"
								lineHeight="none"
								sx={{ wordSpacing: 'normal', letterSpacing: 'tight' }}
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
						children
					)}
				</Box>
			)}
		</Box>
	)
}
