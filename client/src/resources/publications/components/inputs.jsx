import {
	ArrayInput,
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

export const TypeInput = () => {
	const resource = useResourceContext()
	const translate = useTranslate()
	const defaultValue = translate(
		`resources.${resource.split('/').pop()}.name`,
		{ smart_count: 1 },
	)

	return (
		<TextInput
			source="publication.type"
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
			source="publication.year"
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
		source="publication.authorIds"
		reference="authors"
		// validate={required()}
	>
		<SelectArrayInput
			label="fields.authors"
			optionText={(record) => {
				return `${record.lastName} ${record.firstName} ${
					record.middleName || ''
				}`
			}}
		/>
	</ReferenceArrayInput>
)

export const CoauthorsInput = () => (
	<ArrayInput source="publication.coauthors" label="fields.coauthors">
		<SimpleFormIterator>
			<TextInput source="name" label="fields.coauthor" />
		</SimpleFormIterator>
	</ArrayInput>
)

export const CharacterInput = () => (
	<ReferenceInput source="publication.characterId" reference="characters">
		<SelectInput label="fields.character" optionText="name" />
	</ReferenceInput>
)
