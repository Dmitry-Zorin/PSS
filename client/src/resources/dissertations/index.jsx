import LibraryBooksIcon from '@mui/icons-material/LibraryBooks'

export const dissertations = {
	icon: LibraryBooksIcon,
	create: () => import('./DissertationCreate'),
	list: () => import('./DissertationList'),
	show: () => import('./DissertationShow'),
	edit: () => import('./DissertationEdit'),
}
