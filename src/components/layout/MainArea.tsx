import { Box, Heading, Stack } from '@chakra-ui/react'
import { ActionsToolbar, Head } from 'components'
import { HeadProps } from 'components/Head'
import { isString } from 'lodash'
import useTranslation from 'next-translate/useTranslation'
import { ReactNode } from 'react'

export interface MainAreaProps {
	children: ReactNode
	head?: Partial<HeadProps>
	error?: unknown
	title?: string
	leftActions?: ReactNode
	rightActions?: ReactNode
	fullWidth?: boolean
}

export default function MainArea({
	children,
	head,
	error,
	title,
	leftActions,
	rightActions,
	fullWidth,
}: MainAreaProps) {
	const { t } = useTranslation()

	const showActions = leftActions || rightActions
	const heading = error ? t('error') : title

	return (
		<>
			<Head title={head?.title ?? title ?? ''} desc={head?.desc} />
			<Box px={2} pb={16}>
				{showActions && (
					<ActionsToolbar
						leftActions={leftActions}
						rightActions={rightActions}
					/>
				)}
				<Stack as="article" spacing={8}>
					{heading && (
						<Heading
							as="h1"
							fontSize={{ base: '3xl', sm: '5xl', '2xl': '6xl' }}
							lineHeight={{ base: 'shorter', sm: 'none' }}
							pt={{ base: 6, sm: 0 }}
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
						<Box maxW={fullWidth ? undefined : '3xl'}>{children}</Box>
					)}
				</Stack>
			</Box>
		</>
	)
}
