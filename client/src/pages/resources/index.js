import { authors, characters } from './admin'
import { publicationList, timeline } from './main'
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
		publicationList,
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
