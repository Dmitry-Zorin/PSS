import AccountCircleIcon from '@mui/icons-material/AccountCircle'

export const authors = {
	icon: AccountCircleIcon,
	create: () => import('./AuthorCreate'),
	list: () => import('./AuthorList'),
	show: () => import('./AuthorShow'),
	edit: () => import('./AuthorEdit'),
}
