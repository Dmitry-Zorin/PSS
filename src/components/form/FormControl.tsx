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
import { range as _range } from 'lodash'
import useTranslation from 'next-translate/useTranslation'
import { Path, useFormContext } from 'react-hook-form'
import ResizeTextarea from 'react-textarea-autosize'

interface FormControlProps {
	field: Path<any>
	optional?: boolean
	multiline?: boolean
	number?: boolean
	list?: string[]
	range?: [number, number]
	file?: boolean
}

export default function FormControl({
	field,
	optional,
	multiline,
	number,
	list,
	range,
	file,
	...props
}: FormControlProps & InputProps & TextareaProps) {
	const { t } = useTranslation('resources')
	const {
		register,
		formState: { errors },
	} = useFormContext()

	const datalistOptions = range ? _range(...range) : list

	const inputProps = {
		type: number ? 'number' : 'text',
		list: datalistOptions ? field : undefined,
		placeholder: props.placeholder ?? optional ? '-' : undefined,
		...register(field),
		...props,
	}

	return (
		<ChakraFormControl isInvalid={!!errors?.[field]}>
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
			{/* {datalistOptions && (
				<datalist id={field}>
					{datalistOptions.map((e) => (
						<option key={e} value={e} />
					))}
				</datalist>
			)} */}
		</ChakraFormControl>
	)
}
