import { useToast, UseToastOptions } from '@chakra-ui/react'
import useTranslation from 'next-translate/useTranslation'

export default function useEventToast(resource: string, event: string) {
	const { t } = useTranslation('resources')
	const toast = useToast()

	return (status: UseToastOptions['status']) => {
		return toast({
			status,
			position: 'top',
			duration: 2000,
			title: `${t(`${resource}.name_one`)} ${t(
				`events.${event}_${t(`${resource}.gender`)}`,
				null,
				{ fallback: event },
			)}`,
		})
	}
}
