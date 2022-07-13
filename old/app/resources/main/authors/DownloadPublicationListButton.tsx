import { Download } from '@mui/icons-material'
import type { ButtonProps } from '@mui/material'
import { Button } from '@mui/material'
import { saveAs } from 'file-saver'
import { kebabCase } from 'lodash'
import { useRecordContext, useTranslate } from 'react-admin'
import { createDocx } from './docx'
import type { Author } from './types'
import { getAuthorName } from './views'

const DownloadPublicationListButton = (props: ButtonProps) => {
	const translate = useTranslate()
	const author = useRecordContext<Author>()

	return (
		<Button
			variant="contained"
			startIcon={<Download />}
			onClick={async () => {
				const docx = await createDocx(author)
				saveAs(
					docx,
					`${kebabCase(translate('publicationList.name'))}-${kebabCase(
						getAuthorName(author),
					)}`,
				)
			}}
			{...props}
		>
			{`${translate('actions.download')} ${translate('publicationList.name')}`}
		</Button>
	)
}

export default DownloadPublicationListButton
