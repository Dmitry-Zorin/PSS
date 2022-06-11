import {
	ArrayField,
	ChipField,
	FileField,
	Labeled,
	SingleFieldList,
} from 'react-admin'

export const ChipArrayField = ({ fieldSource = 'value', ...props }) => (
	<ArrayField {...props}>
		<SingleFieldList linkType={false}>
			<ChipField source={fieldSource} clickable={false} />
		</SingleFieldList>
	</ArrayField>
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
