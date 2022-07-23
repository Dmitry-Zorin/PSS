import {
	faAddressCard,
	faAward,
	faBookOpen,
	faCircle,
	faCircleInfo,
	faCode,
	faFile,
	faFileCircleCheck,
	faFileCircleQuestion,
	faFileCode,
	faFileContract,
	faFileInvoice,
	faFileLines,
	faFilePen,
	faFileSignature,
	faGraduationCap,
	faList,
	faNewspaper,
	faPaste,
	faSheetPlastic,
	faSignature,
	faTimeline,
} from '@fortawesome/free-solid-svg-icons'

const resources = {
	about: {
		icon: faCircleInfo,
	},
	timeline: {
		icon: faTimeline,
	},
	authors: {
		icon: faAddressCard,
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
