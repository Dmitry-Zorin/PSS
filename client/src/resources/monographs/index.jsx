import DescriptionIcon from '@mui/icons-material/Description'

export const monographs = {
	icon: DescriptionIcon,
	create: () => import('./MonographCreate'),
	list: () => import('./MonographList'),
	show: () => import('./MonographShow'),
	edit: () => import('./MonographEdit'),
}
