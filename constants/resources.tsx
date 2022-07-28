import {
	faAddressCard,
	faAward,
	faBookOpen,
	faCircleInfo,
	faCode,
	faFileInvoice,
	faFileLines,
	faGraduationCap,
	faNewspaper,
	faPaste,
	faSheetPlastic,
	faTimeline,
} from '@fortawesome/free-solid-svg-icons'

const resources = {
	main: {
		about: {
			icon: faCircleInfo,
		},
		timeline: {
			icon: faTimeline,
		},
		authors: {
			icon: faAddressCard,
		},
	},
	publications: {
		articles: {
			icon: faNewspaper,
		},
		abstracts: {
			icon: faSheetPlastic,
		},
		dissertations: {
			icon: faGraduationCap,
		},
		monographs: {
			icon: faFileLines,
		},
		patents: {
			icon: faAward,
		},
		reports: {
			icon: faFileInvoice,
		},
		programs: {
			icon: faCode,
		},
		textbooks: {
			icon: faBookOpen,
		},
	},
	admin: {
		characters: {
			icon: faPaste,
		},
	},
}

export default resources
