import { Chip } from '@material-ui/core'
import React, { cloneElement } from 'react'
import { ChipField, FileField, Labeled, ReferenceField, TextField } from 'react-admin'

const LabeledField = ({ children, ...props }) => (
	<Labeled {...props}>
		{cloneElement(children, props)}
	</Labeled>
)

export const ChipArrayField = ({ record, source }) => (
	<>
		{record[source].map(item => (
			<Chip key={item} label={item}/>
		))}
	</>
)

export const TitleField = () => (
	<LabeledField source='title'>
		<TextField/>
	</LabeledField>
)

export const DescriptionField = () => (
	<LabeledField source='description'>
		<TextField/>
	</LabeledField>
)

export const TypeField = () => (
	<TextField source='type'/>
)

export const YearField = () => (
	<LabeledField source='year'>
		<ChipField/>
	</LabeledField>
)

export const VolumeField = () => (
	<TextField source='volume'/>
)

export const AuthorsField = ({ record }) => (
	<ChipArrayField source='authors' record={record}/>
)

export const ExitDataField = () => (
	<TextField source='exitData'/>
)

export const CharactersField = () => (
	<ReferenceField source='character' reference='characters'>
		<ChipField source='name'/>
	</ReferenceField>
)

export const DownloadFileField = () => (
	<FileField
		source='file.url'
		title='file.name'
	/>
)
