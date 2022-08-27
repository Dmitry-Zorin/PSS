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
import useTranslation from 'next-translate/useTranslation'
import { useFormContext } from 'react-hook-form'
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
	const {
		register,
		formState: { errors },
	} = useFormContext()

	const inputProps = {
		value,
		placeholder: props.placeholder ?? optional ? '-' : undefined,
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
				{errors[field]?.message as string | undefined}
			</FormErrorMessage>
		</ChakraFormControl>
	)
}
