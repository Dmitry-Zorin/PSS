import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'

export const abstracts = {
	icon: InsertDriveFileIcon,
	create: () => import('./AbstractCreate'),
	list: () => import('./AbstractList'),
	show: () => import('./AbstractShow'),
	edit: () => import('./AbstractEdit'),
}
