import type { TextInputProps } from 'react-admin'
import { FileField, FileInput, required, TextInput } from 'react-admin'

interface LargeTextInputProps extends TextInputProps {
	required?: boolean
}

export const LargeTextInput = (props: LargeTextInputProps) => (
	<TextInput
		label={`fields.${props.source}`}
		validate={props.required ? required() : undefined}
		fullWidth
		multiline
		{...props}
	/>
)

export const AddFileInput = () => (
	<FileInput source="file" label="fields.file">
		<FileField title="filename" />
	</FileInput>
)

export const ReplaceFileInput = () => (
	<FileInput source="file" label="fields.file">
		<FileField source="url" title="name" />
	</FileInput>
)
