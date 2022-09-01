import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react'
import { CoauthorInputList } from 'components'
import useTranslation from 'next-translate/useTranslation'
import { FieldError, useFormContext } from 'react-hook-form'

export default function Coauthors() {
	const { t } = useTranslation('resources')

	const {
		formState: { errors },
	} = useFormContext()

	function handleError(error?: FieldError) {
		if (!error) return
		switch (error.type) {
			default:
				return error.message
		}
	}

	return (
		<FormControl isInvalid={!!errors.coauthors}>
			<FormLabel>{t('fields.coauthors')}</FormLabel>
			<CoauthorInputList />
			<FormErrorMessage>
				{handleError(errors.coauthors as FieldError | undefined)}
			</FormErrorMessage>
		</FormControl>
	)
}
