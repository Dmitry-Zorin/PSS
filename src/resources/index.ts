import { characters } from './admin'
import { authors } from './main'
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
