import { Heading, Stack } from '@chakra-ui/react'
import { ActionsToolbar, Head } from 'components'
import { HeadProps } from 'components/Head'
import { isString } from 'lodash'
import useTranslation from 'next-translate/useTranslation'
import { ReactNode } from 'react'

export interface MainAreaProps {
	children?: ReactNode
	head?: Partial<HeadProps>
	error?: unknown
	title?: string
	leftActions?: ReactNode
	rightActions?: ReactNode
	fullWidth?: boolean
	capsTitle?: boolean
}

export default function MainArea({
	children,
	head,
	error,
	title,
	leftActions,
	rightActions,
	fullWidth,
	capsTitle,
}: MainAreaProps) {
	const { t } = useTranslation()

	const showActions = leftActions || rightActions
	const heading = error ? t('words.error') : title ?? head?.title

	const actionsToolbar = showActions && (
		<ActionsToolbar leftActions={leftActions} rightActions={rightActions} />
	)

	return (
		<>
			<Head title={head?.title ?? title ?? ''} desc={head?.desc} />
			<Stack spacing={4} px={2} pb={16}>
				{!fullWidth && actionsToolbar}
				<Stack as="article" spacing={8}>
					{heading && (
						<Heading
							as="h1"
							fontSize={
								capsTitle
									? { base: '2xl', sm: '4xl', '2xl': '5xl' }
									: { base: '3xl', sm: '5xl', '2xl': '6xl' }
							}
							lineHeight={
								capsTitle ? 'shorter' : { base: 'shorter', sm: 'none' }
							}
							pt={{ base: 6, sm: 0 }}
						>
							{capsTitle ? heading.toUpperCase() : heading}
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
						<Stack spacing={6} maxW={fullWidth ? undefined : '3xl'}>
							{fullWidth && actionsToolbar}
							{children}
						</Stack>
					)}
				</Stack>
			</Stack>
		</>
	)
}
