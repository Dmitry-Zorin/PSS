import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile'

export const abstracts = {
	icon: InsertDriveFileIcon,
	create: () => import('./AbstractCreate'),
	list: () => import('./AbstractList'),
	show: () => import('./AbstractShow'),
	edit: () => import('./AbstractEdit'),
}
