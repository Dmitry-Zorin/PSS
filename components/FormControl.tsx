import {
	FormControl as ChakraFormControl,
	FormErrorMessage,
	FormHelperText,
	FormLabel,
	HStack,
	Input,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { Path, UseFormRegister } from 'react-hook-form'
import { FieldErrors } from 'react-hook-form/dist/types/errors'

interface MyFormControlProps<T extends Record<string, any>> {
	field: Path<T>
	errors?: FieldErrors<T>
	register?: UseFormRegister<T>
	optional?: boolean
}

export default function FormControl<T extends Record<string, any>>({
	field,
	errors,
	register,
	optional,
}: MyFormControlProps<T>) {
	const { t } = useTranslation('fields')
	return (
		<ChakraFormControl isInvalid={!!errors?.[field]}>
			<HStack justify="space-between">
				<FormLabel>{t(field)}</FormLabel>
				{optional && <FormHelperText>optional</FormHelperText>}
			</HStack>
			<Input
				placeholder={field}
				{...register?.(field, {
					required: 'required',
					minLength: { value: 4, message: 'Minimum length should be 4' },
				})}
			/>
			<FormErrorMessage>{errors?.[field]?.message as string}</FormErrorMessage>
		</ChakraFormControl>
	)
}
