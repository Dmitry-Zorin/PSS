import { ChipField, TextField } from 'react-admin'
import {
	CharacterField,
	ChipArrayField,
	DownloadFileField,
} from '../components/fields'
import MyShow from '../MyShow'

const PublicationShow = ({ children }) => (
	<MyShow>
		<TextField source="title" label="fields.title" emptyText="-" />
		<TextField source="description" label="fields.description" emptyText="-" />
		<TextField source="type" label="fields.type" emptyText="-" />
		<ChipField source="year" label="fields.year" emptyText="-" />
		<ChipField source="volume" label="fields.volume" emptyText="-" />
		<ChipArrayField source="authors" label="fields.authors" />
		<CharacterField />
		<TextField source="outputData" label="fields.outputData" emptyText="-" />
		{children}
		<DownloadFileField />
	</MyShow>
)

export default PublicationShow
