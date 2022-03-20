import LibraryBooksIcon from '@material-ui/icons/LibraryBooks'

export const dissertations = {
	icon: LibraryBooksIcon,
	create: () => import('./DissertationCreate'),
	list: () => import('./DissertationList'),
	show: () => import('./DissertationShow'),
	edit: () => import('./DissertationEdit'),
}
