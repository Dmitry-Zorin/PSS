import SelectInput from '@mui/material/Select/SelectInput'
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
	TextInput, useResourceContext,
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
	<LargeTextInput source='title' label='fields.title' required/>
)

export const DescriptionInput = () => (
	<LargeTextInput source='description' label='fields.description'/>
)

export const TypeInput = () => {
	const resource = useResourceContext()
	const translate = useTranslate()
	const defaultValue = translate(
		`resources.${resource}.name`,
		{ _: capitalize(resource) },
	)
	return (
		<TextInput
			source='type'
			label='fields.type'
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
			source='year'
			label='fields.year'
			min={min}
			max={max}
			defaultValue={max}
			validate={[minValue(min), maxValue(max)]}
		/>
	)
}

export const VolumeInput = () => (
	<NumberInput source='volume' label='fields.volume'/>
)

export const AuthorsInput = () => (
	<ArrayInput source='authors' label='fields.authors' validate={required()}>
		<SimpleFormIterator>
			<TextInput source='value' label='fields.author'/>
		</SimpleFormIterator>
	</ArrayInput>
)

export const CharacterInput = () => (
	<ReferenceInput source='character' reference='characters'>
		<SelectInput optionText='name'/>
	</ReferenceInput>
)

export const ExitDataInput = () => (
	<LargeTextInput source='exitData' label='fields.exitData'/>
)

export const AddFileInput = () => (
	<FileInput source='file' label='fields.file'>
		<FileField title='filename'/>
	</FileInput>
)

export const ReplaceFileInput = () => (
	<FileInput source='file' label='fields.file'>
		<FileField source='url' title='name'/>
	</FileInput>
)
