import React from 'react'
import {
	ArrayField,
	ChipField,
	FileField,
	Labeled,
	ReferenceField,
	SingleFieldList,
} from 'react-admin'

export const ChipArrayField = (props) => (
	<ArrayField {...props}>
		<SingleFieldList linkType={false}>
			<ChipField source="value" clickable={false} />
		</SingleFieldList>
	</ArrayField>
)

export const CharacterField = () => (
	<Labeled>
		<ReferenceField
			source="characterId"
			label="fields.character"
			reference="characters"
			emptyText="-"
		>
			<ChipField source="name" />
		</ReferenceField>
	</Labeled>
)

export const DownloadFileField = () => (
	<Labeled>
		<FileField
			source="file.url"
			label="fields.file"
			title="file.name"
			emptyText="-"
		/>
	</Labeled>
)
