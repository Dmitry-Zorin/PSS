import {
	FieldProps,
	FunctionField,
	ReferenceArrayField,
	ReferenceField,
	SingleFieldList,
	TextField,
} from 'react-admin'
import { getAuthorName } from 'resources/main/authors/views'

export const AuthorsField = (props: FieldProps) => (
	<ReferenceArrayField
		source="publication.authorIds"
		label="fields.authors"
		reference="authors"
		{...props}
	>
		<SingleFieldList linkType={false} sx={{ justifyContent: 'center' }}>
			<FunctionField
				label="fields.authors"
				render={getAuthorName}
				whiteSpace="nowrap"
				width={1}
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
