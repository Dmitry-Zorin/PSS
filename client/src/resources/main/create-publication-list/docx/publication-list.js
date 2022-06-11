import { Packer } from 'docx'
import { saveAs } from 'file-saver'
import { getDocument } from './document'

const TITLE = 'Список научных трудов.docx'

export const createPublicationList = async (data, name, title) => {
	const doc = getDocument(data, name, title)
	saveAs(await Packer.toBlob(doc), TITLE)
}
