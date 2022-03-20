import { Chip } from '@material-ui/core'
import React, { cloneElement } from 'react'
import { ChipField, FileField, Labeled, ReferenceField, TextField } from 'react-admin'

const LabeledField = ({ children, ...props }) => (
	<Labeled {...props}>
		{cloneElement(children, { ...props, emptyText: '-' })}
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
	<LabeledField source='type'>
		<TextField/>
	</LabeledField>
)

export const YearField = () => (
	<LabeledField source='year'>
		<ChipField/>
	</LabeledField>
)

export const VolumeField = () => (
	<LabeledField source='volume'>
		<ChipField/>
	</LabeledField>
)

export const AuthorsField = ({ record }) => (
	<LabeledField source='authors'>
		<ChipArrayField record={record}/>
	</LabeledField>
)

export const ExitDataField = () => (
	<LabeledField source='exitData'>
		<TextField/>
	</LabeledField>
)

export const CharactersField = () => (
	<LabeledField source='character'>
		<ReferenceField reference='characters'>
			<ChipField source='name'/>
		</ReferenceField>
	</LabeledField>
)

export const DownloadFileField = () => (
	<LabeledField label='File'>
		<FileField source='file.url' title='file.name'/>
	</LabeledField>
)
