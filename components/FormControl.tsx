import {
	FormControl as ChakraFormControl,
	FormErrorMessage,
	FormLabel,
	Input,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { UseFormRegister } from 'react-hook-form'
import { FieldErrors } from 'react-hook-form/dist/types/errors'

interface MyFormControlProps<T extends Record<string, any>> {
	field: keyof T & string
	errors: FieldErrors<T>
	register: UseFormRegister<T>
}

export default function MyFormControl<T extends Record<string, any>>({
	field,
	errors,
	register,
}: MyFormControlProps<T>) {
	const { t } = useTranslation('fields')
	return (
		<ChakraFormControl isInvalid={!!errors[field]}>
			<FormLabel htmlFor={field}>{t(field)}</FormLabel>
			<Input
				id={field}
				placeholder={field}
				{...register(field, {
					required: 'This is required',
					minLength: { value: 4, message: 'Minimum length should be 4' },
				})}
			/>
			<FormErrorMessage>{errors[field]?.message}</FormErrorMessage>
		</ChakraFormControl>
	)
}
