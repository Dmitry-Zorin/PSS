import {
	FormControl as ChakraFormControl,
	FormErrorMessage,
	FormLabel,
	HStack,
	Input,
	InputProps,
	Textarea,
	TextareaProps,
} from '@chakra-ui/react'
import { useHandleFormError } from 'hooks'
import useTranslation from 'next-translate/useTranslation'
import { FieldError, useFormContext } from 'react-hook-form'
import ResizeTextarea from 'react-textarea-autosize'

interface FormControlProps {
	field: string
	value?: string | number
	optional?: boolean
	multiline?: boolean
}

export default function FormControl({
	field,
	value,
	optional,
	multiline,
	...props
}: FormControlProps & InputProps & TextareaProps) {
	const { t } = useTranslation('resources')
	const handleError = useHandleFormError(field, { type: props.type })

	const {
		register,
		formState: { errors },
	} = useFormContext()

	const inputProps = {
		value,
		placeholder: props.placeholder ?? optional ? '...' : undefined,
		...register(field),
		...props,
	}

	return (
		<ChakraFormControl isInvalid={!!errors[field]}>
			<HStack justify="space-between">
				<FormLabel>{t(`fields.${field}`)}</FormLabel>
			</HStack>
			{multiline ? (
				<Textarea
					as={ResizeTextarea}
					resize="none"
					overflow="hidden"
					{...inputProps}
				/>
			) : (
				<Input {...inputProps} />
			)}
			<FormErrorMessage>
				{handleError(errors[field] as FieldError | undefined)}
			</FormErrorMessage>
		</ChakraFormControl>
	)
}
