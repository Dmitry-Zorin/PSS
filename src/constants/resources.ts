import {
	faAward,
	faBook,
	faBookOpen,
	faCircleInfo,
	faCode,
	faFileInvoice,
	faFileLines,
	faGraduationCap,
	faNewspaper,
	faSheetPlastic,
	faTimeline,
	faUserGraduate,
} from '@fortawesome/free-solid-svg-icons'

const resources = {
	main: {
		items: {
			about: {
				icon: faCircleInfo,
			},
			timeline: {
				icon: faTimeline,
			},
			authors: {
				icon: faUserGraduate,
			},
		},
	},
	publications: {
		icon: faBook,
		items: {
			articles: {
				icon: faNewspaper,
				category: 'A',
			},
			abstracts: {
				icon: faSheetPlastic,
				category: 'A',
			},
			dissertations: {
				icon: faGraduationCap,
				category: 'A',
			},
			monographs: {
				icon: faFileLines,
				category: 'A',
			},
			patents: {
				icon: faAward,
				category: 'B',
			},
			reports: {
				icon: faFileInvoice,
				category: 'B',
			},
			programs: {
				icon: faCode,
				category: 'B',
			},
			textbooks: {
				icon: faBookOpen,
				category: 'C',
			},
		},
	},
}

export type Resources = typeof resources

export type ResourceKey = keyof Resources

export type ResourceValue = Resources[ResourceKey]

export default resources
