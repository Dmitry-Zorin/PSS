import { Download } from '@mui/icons-material'
import { Button } from '@mui/material'
import {
	ArrayField,
	SingleFieldList,
	TextField,
	useRecordContext,
} from 'react-admin'

export const ChipArrayField = ({ fieldSource = 'value', ...props }) => (
	<ArrayField {...props}>
		<SingleFieldList linkType={false}>
			<TextField source={fieldSource} />
		</SingleFieldList>
	</ArrayField>
)

export const DownloadFileField = () => {
	const record = useRecordContext()

	return record.file ? (
		<Button
			variant="contained"
			startIcon={<Download />}
			href={record.file.url}
			target="_blank"
		>
			Download
		</Button>
	) : null
}
