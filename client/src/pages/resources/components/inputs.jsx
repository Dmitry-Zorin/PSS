import { FileField, FileInput, required, TextInput } from 'react-admin'

export const LargeTextInput = ({
	source,
	required: isRequired = false,
	...props
}) => (
	<TextInput
		source={source}
		label={`fields.${source}`}
		fullWidth
		multiline
		validate={isRequired ? required() : undefined}
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
