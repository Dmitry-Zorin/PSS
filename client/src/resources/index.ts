import { authors, characters } from './admin'
import { createPublicationList, timeline } from './main'
import {
	abstracts,
	articles,
	dissertations,
	monographs,
	patents,
	programs,
	reports,
	textbooks,
} from './publications'

export default {
	main: {
		timeline,
		createPublicationList,
	},
	publications: {
		articles,
		abstracts,
		dissertations,
		monographs,
		patents,
		reports,
		programs,
		textbooks,
	},
	admin: {
		authors,
		characters,
	},
}
