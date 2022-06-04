import {
	AccountCircle,
	Code,
	Description,
	FeaturedPlayList,
	InsertDriveFile,
	LibraryBooks,
	MenuBook,
	PlaylistAddCheck,
	Subject,
	Timeline as TimelineIcon,
	VerticalSplit,
	Workspaces,
} from '@mui/icons-material'
import {
	AuthorCreate,
	AuthorEdit,
	AuthorList,
	AuthorShow,
} from './components/admin/authors'
import {
	CharacterCreate,
	CharacterEdit,
	CharacterList,
} from './components/admin/characters'
import { PublicationsList } from './components/main/publications-list/PublicationsList'
import { Timeline } from './components/main/timeline/Timeline'
import {
	PublicationCreate,
	PublicationEdit,
	PublicationList,
	PublicationShow,
} from './components/publications'

const publicationProps = {
	create: PublicationCreate,
	edit: PublicationEdit,
	list: PublicationList,
	show: PublicationShow,
}

export default {
	main: {
		timeline: {
			icon: TimelineIcon,
			list: Timeline,
		},
		publicationsList: {
			icon: FeaturedPlayList,
			list: PublicationsList,
		},
	},
	publications: {
		articles: {
			icon: VerticalSplit,
			...publicationProps,
		},
		abstracts: {
			icon: InsertDriveFile,
			...publicationProps,
		},
		dissertations: {
			icon: LibraryBooks,
			...publicationProps,
		},
		monographs: {
			icon: Description,
			...publicationProps,
		},
		patents: {
			icon: PlaylistAddCheck,
			...publicationProps,
		},
		reports: {
			icon: Subject,
			...publicationProps,
		},
		programs: {
			icon: Code,
			...publicationProps,
		},
		textbooks: {
			icon: MenuBook,
			...publicationProps,
		},
	},
	admin: {
		authors: {
			icon: AccountCircle,
			create: AuthorCreate,
			edit: AuthorEdit,
			list: AuthorList,
			show: AuthorShow,
		},
		characters: {
			icon: Workspaces,
			create: CharacterCreate,
			edit: CharacterEdit,
			list: CharacterList,
		},
	},
}
