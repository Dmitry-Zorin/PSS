import { ToastProps, useToast, UseToastOptions } from '@chakra-ui/react'
import { HttpError } from 'http-errors'
import useTranslation from 'next-translate/useTranslation'

export default function useEventToast(resource: string, event: string) {
	const { t } = useTranslation('resources')
	const toast = useToast()

	const eventTitle = `${t(`${resource}.name_one`)} ${t(
		`events.${event}_${t(`${resource}.gender`)}`,
		null,
		{ fallback: event },
	)}`

	return (
		status: UseToastOptions['status'],
		props?: ToastProps & { error?: unknown },
	) => {
		return toast({
			status,
			position: 'top',
			duration: 2000,
			title: props?.error
				? props.error instanceof HttpError
					? t(`common:errors.${props.error.status}`)
					: t('common:messages.error')
				: eventTitle,
			description:
				props?.error instanceof HttpError ? props.error.message : undefined,
			...props,
		})
	}
}
