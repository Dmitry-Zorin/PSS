import { characters } from './admin'
import { authors, timeline } from './main'
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
		authors,
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
		characters,
	},
}
