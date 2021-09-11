import SelectInput from '@material-ui/core/Select/SelectInput'
import capitalize from 'just-capitalize'
import React from 'react'
import {
	ArrayInput,
	FileField,
	FileInput,
	maxValue,
	minValue,
	NumberInput,
	ReferenceInput,
	required,
	required as _required,
	SimpleFormIterator,
	TextInput,
	useTranslate,
} from 'react-admin'

export const LargeTextInput = ({ className, required, ...props }) => (
	<TextInput
		fullWidth
		multiline
		validate={required ? _required() : undefined}
		{...props}
	/>
)

export const TitleInput = () => (
	<LargeTextInput source='title' required/>
)

export const DescriptionInput = () => (
	<LargeTextInput source='description'/>
)

export const TypeInput = ({ resource }) => {
	const translate = useTranslate()
	const defaultValue = translate(
		`resources.${resource}.name`,
		{ _: capitalize(resource) },
	)
	return (
		<TextInput source='type' validate={required()} defaultValue={defaultValue}/>
	)
}

export const YearInput = () => {
	const max = new Date().getFullYear()
	const min = max - 50
	return (
		<NumberInput
			source='year'
			min={min}
			max={max}
			defaultValue={max}
			validate={[minValue(min), maxValue(max)]}
		/>
	)
}

export const VolumeInput = () => (
	<NumberInput source='volume'/>
)

export const AuthorsInput = () => (
	<ArrayInput source='authors' validate={required()}>
		<SimpleFormIterator>
			<TextInput label='resources.articles.fields.author'/>
		</SimpleFormIterator>
	</ArrayInput>
)

export const CharacterInput = () => (
	<ReferenceInput source='character' reference='characters'>
		<SelectInput optionText='name'/>
	</ReferenceInput>
)

export const ExitDataInput = () => (
	<LargeTextInput source='exitData'/>
)

export const AddFileInput = () => (
	<FileInput source='file'>
		<FileField title='filename'/>
	</FileInput>
)

export const ReplaceFileInput = () => (
	<FileInput source='file'>
		<FileField source='url' title='name'/>
	</FileInput>
)