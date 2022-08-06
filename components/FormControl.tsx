import {
	FormControl as ChakraFormControl,
	FormErrorMessage,
	FormHelperText,
	FormLabel,
	HStack,
	Input,
	InputProps,
	Textarea,
	TextareaProps,
} from '@chakra-ui/react'
import { range as _range } from 'lodash'
import { useTranslation } from 'next-i18next'
import { Path, UseFormRegister } from 'react-hook-form'
import { FieldErrors } from 'react-hook-form/dist/types/errors'
import ResizeTextarea from 'react-textarea-autosize'

interface MyFormControlProps {
	field: Path<any>
	errors?: FieldErrors<any>
	register?: UseFormRegister<any>
	optional?: boolean
	multiline?: boolean
	number?: boolean
	list?: string[]
	range?: [number, number]
}

export default function FormControl({
	field,
	errors,
	register,
	optional,
	multiline,
	number,
	list,
	range,
	...props
}: MyFormControlProps & InputProps & TextareaProps) {
	const { t } = useTranslation('fields')

	const datalistOptions = range ? _range(...range) : list

	const inputProps = {
		type: number ? 'number' : 'text',
		list: datalistOptions ? field : undefined,
		...register?.(field),
		...props,
	}

	return (
		<ChakraFormControl isInvalid={!!errors?.[field]}>
			<HStack justify="space-between">
				<FormLabel>{t(field)}</FormLabel>
				{optional && <FormHelperText>optional</FormHelperText>}
			</HStack>
			{multiline ? (
				<Textarea
					as={ResizeTextarea}
					resize="none"
					minH="unset"
					overflow="hidden"
					{...inputProps}
				/>
			) : (
				<Input {...inputProps} />
			)}
			<FormErrorMessage mt={1.5}>
				{errors?.[field]?.message as string | undefined}
			</FormErrorMessage>
			{datalistOptions && (
				<datalist id={field}>
					{datalistOptions.map((e) => (
						<option key={e} value={e} />
					))}
				</datalist>
			)}
		</ChakraFormControl>
	)
}
