import VerticalSplitIcon from '@mui/icons-material/VerticalSplit'

export const articles = {
	icon: VerticalSplitIcon,
	create: () => import('./ArticleCreate'),
	list: () => import('./ArticleList'),
	show: () => import('./ArticleShow'),
	edit: () => import('./ArticleEdit'),
}
