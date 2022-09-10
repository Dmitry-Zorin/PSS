import useTranslation from 'next-translate/useTranslation'
import { FieldError } from 'react-hook-form'

interface UseHandleFormErrorOptions {
	type?: string
}

export default function useHandleFormError(
	field: string,
	options?: UseHandleFormErrorOptions,
) {
	const { t } = useTranslation('validations')

	const type = options?.type ?? 'string'

	return (error?: FieldError) => {
		if (!error) return
		switch (error.type) {
			case 'too_small':
			case 'too_big':
				const count = +error.message!.match(/\d+/)![0]
				return `${t(`errors.${type}_${error.type}`, {
					field: t(`resources:fields.${field}`),
					count,
				})}${
					type === 'string'
						? ` ${t('publicationForms.name', {
								count,
						  })}`
						: ''
				}`
			default:
				return error.message
		}
	}
}
