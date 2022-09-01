import useTranslation from 'next-translate/useTranslation'
import { FieldError } from 'react-hook-form'

export default function useHandleFormError(field: string) {
	const { t } = useTranslation('validations')

	return (error?: FieldError) => {
		if (!error) return
		switch (error.type) {
			case 'too_small':
				const count = +error.message!.match(/\d+/)![0]
				return `${t('errors.too_small', {
					field: t(`resources:fields.${field}`),
					count,
				})} ${t('symbols.name', {
					count,
				})}`
			default:
				return error.message
		}
	}
}
