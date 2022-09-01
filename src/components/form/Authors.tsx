import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react'
import { AuthorSelect } from 'components'
import useTranslation from 'next-translate/useTranslation'
import { FieldError, useFormContext } from 'react-hook-form'

export default function Authors() {
	const { t } = useTranslation('resources')

	const {
		formState: { errors },
	} = useFormContext()

	function handleError(error?: FieldError) {
		if (!error) return
		switch (error.type) {
			case 'invalid_type':
			case 'too_small':
			case 'too_big':
				const isTooBig = error.type === 'too_big'
				const count =
					error.type === 'invalid_type' ? 1 : +error.message!.match(/\d+/)![0]
				return `${t(
					`validations:errors.authors_${isTooBig ? 'too_big' : 'too_small'}`,
					{ count },
				)} ${t('validations:authors.name', {
					count,
				})}`
			default:
				return error.message
		}
	}

	return (
		<FormControl isInvalid={!!errors.authors}>
			<FormLabel>{t('authors.name_other')}</FormLabel>
			<AuthorSelect />
			<FormErrorMessage>
				{handleError(errors.authors as FieldError | undefined)}
			</FormErrorMessage>
		</FormControl>
	)
}
