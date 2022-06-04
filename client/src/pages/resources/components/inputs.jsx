import {
	ArrayInput,
	FileField,
	FileInput,
	maxValue,
	minValue,
	NumberInput,
	ReferenceArrayInput,
	ReferenceInput,
	required,
	SelectArrayInput,
	SelectInput,
	SimpleFormIterator,
	TextInput,
	useResourceContext,
	useTranslate,
} from 'react-admin'

export const LargeTextInput = ({
	source,
	label,
	required: _required,
	...props
}) => (
	<TextInput
		source={source}
		label={label || `fields.${source}`}
		fullWidth
		multiline
		validate={_required ? required() : undefined}
		{...props}
	/>
)

export const TypeInput = () => {
	const resource = useResourceContext()
	const translate = useTranslate()
	const defaultValue = translate(`resources.${resource}.name`, {
		smart_count: 1,
	})

	return (
		<TextInput
			source="type"
			label="fields.type"
			validate={required()}
			defaultValue={defaultValue}
		/>
	)
}

export const YearInput = () => {
	const max = new Date().getFullYear()
	const min = max - 50

	return (
		<NumberInput
			source="year"
			label="fields.year"
			min={min}
			max={max}
			defaultValue={max}
			validate={[minValue(min), maxValue(max)]}
		/>
	)
}

export const AuthorsInput = () => (
	<ReferenceArrayInput
		source="authorIds"
		reference="authors"
		// validate={required()}
	>
		<SelectArrayInput
			label="fields.author"
			optionText={(record) => {
				return `${record.lastName} ${record.firstName} ${
					record.middleName || ''
				}`
			}}
		/>
	</ReferenceArrayInput>
)

export const CoauthorsInput = () => (
	<ArrayInput source="coauthors" label="fields.coauthors">
		<SimpleFormIterator>
			<TextInput source="name" label="fields.coauthor" />
		</SimpleFormIterator>
	</ArrayInput>
)

export const CharacterInput = () => (
	<ReferenceInput source="characterId" reference="characters">
		<SelectInput optionText="name" />
	</ReferenceInput>
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
