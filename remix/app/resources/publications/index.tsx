import {
	Code,
	Description,
	Equalizer,
	FindInPage,
	Grading,
	MenuBook,
	Newspaper,
	Verified,
} from '@mui/icons-material'

const publicationViews = {
	// create: PublicationCreate,
	// edit: PublicationEdit,
	// list: PublicationList,
	// show: PublicationShow,
}

export const articles = {
	icon: <Newspaper />,
	...publicationViews,
}

export const abstracts = {
	icon: <Description />,
	...publicationViews,
}

export const dissertations = {
	icon: <Grading />,
	...publicationViews,
}

export const monographs = {
	icon: <FindInPage />,
	...publicationViews,
}

export const patents = {
	icon: <Verified />,
	...publicationViews,
}

export const reports = {
	icon: <Equalizer />,
	...publicationViews,
}

export const programs = {
	icon: <Code />,
	...publicationViews,
}

export const textbooks = {
	icon: <MenuBook />,
	...publicationViews,
}
