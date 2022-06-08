import {
	Code,
	Description,
	InsertDriveFile,
	LibraryBooks,
	MenuBook,
	PlaylistAddCheck,
	Subject,
	VerticalSplit,
} from '@mui/icons-material'
import {
	PublicationCreate,
	PublicationEdit,
	PublicationList,
	PublicationShow,
} from './views'

const publicationViews = {
	create: PublicationCreate,
	edit: PublicationEdit,
	list: PublicationList,
	show: PublicationShow,
}

export const articles = {
	icon: VerticalSplit,
	...publicationViews,
}

export const abstracts = {
	icon: InsertDriveFile,
	...publicationViews,
}

export const dissertations = {
	icon: LibraryBooks,
	...publicationViews,
}

export const monographs = {
	icon: Description,
	...publicationViews,
}

export const patents = {
	icon: PlaylistAddCheck,
	...publicationViews,
}

export const reports = {
	icon: Subject,
	...publicationViews,
}

export const programs = {
	icon: Code,
	...publicationViews,
}

export const textbooks = {
	icon: MenuBook,
	...publicationViews,
}
