import { Chip } from '@mui/material'
import {
	ChipField,
	FieldProps,
	FunctionField,
	ReferenceArrayField,
	ReferenceField,
	SingleFieldList,
} from 'react-admin'
import {
	Author,
	getAuthorName,
} from 'resources/main/create-publication-list/CreatePublicationList'

export const AuthorsField = (props: FieldProps) => (
	<ReferenceArrayField
		source="publication.authorIds"
		label="fields.authors"
		reference="authors"
		{...props}
	>
		<SingleFieldList linkType="show">
			<FunctionField
				label="fields.authors"
				render={(author: Author) => (
					<Chip
						clickable={true}
						label={getAuthorName(author)}
						sx={{ m: 0.5 }}
					/>
				)}
			/>
		</SingleFieldList>
	</ReferenceArrayField>
)

export const CharacterField = () => (
	<ReferenceField
		source="publication.characterId"
		label="fields.character"
		reference="characters"
		link="list"
		emptyText="-"
	>
		<ChipField source="name" />
	</ReferenceField>
)
