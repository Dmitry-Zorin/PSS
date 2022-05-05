import React from 'react'
import { AddFileInput, AuthorsInput, CharacterInput, CoauthorsInput, LargeTextInput, TypeInput, YearInput } from '../../components/inputs'
import { ReplaceFileInput } from '../../components/inputs'
import { NumberInput, TextInput } from 'react-admin'

const CommonInputs = () => (
	<>
		<LargeTextInput source='title' required/>
		<LargeTextInput source='description'/>
		<TypeInput/>
		<YearInput/>
		<NumberInput source='volume' label='fields.volume'/>
		<AuthorsInput/>
		<CoauthorsInput/>
		<CharacterInput/>
		<LargeTextInput source='outputData'/>
	</>
)

export const publicationFilters = [
	<TextInput source='title' label='fields.search' alwaysOn/>,
	<TextInput source='description' label='fields.description'/>,
	<NumberInput source='year' label='fields.year'/>,
	<TextInput source='authors.author' label='fields.author'/>,
	<TextInput source='outputData' label='fields.outputData'/>,
]

export const CreatePublicationInputs = () => (
	<>
		<CommonInputs/>
		<AddFileInput/>
	</>
)

export const EditPublicationInputs = () => (
	<>
		<CommonInputs/>
		<ReplaceFileInput/>
	</>
)
