import { Chip } from '@mui/material'
import {
	ChipField,
	ReferenceArrayField,
	ReferenceField,
	SingleFieldList,
	useRecordContext,
} from 'react-admin'

const AuthorChipField = () => {
	const record = useRecordContext()
	return (
		<Chip
			clickable={true}
			label={`${record.lastName} ${record.firstName} ${
				record.middleName || ''
			}`}
		/>
	)
}

export const AuthorsField = () => (
	<ReferenceArrayField
		source="publication.authorIds"
		label="fields.authors"
		reference="authors"
	>
		<SingleFieldList linkType="show">
			<AuthorChipField />
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
