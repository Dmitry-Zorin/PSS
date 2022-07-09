import {
	FieldProps,
	FunctionField,
	ReferenceArrayField,
	ReferenceField,
	SingleFieldList,
	TextField,
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
		<SingleFieldList linkType="show" sx={{ justifyContent: 'center' }}>
			<FunctionField
				label="fields.authors"
				render={(author: Author) => getAuthorName(author)}
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
		<TextField source="name" />
	</ReferenceField>
)
