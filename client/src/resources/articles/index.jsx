import VerticalSplitIcon from '@material-ui/icons/VerticalSplit'

export const articles = {
	icon: VerticalSplitIcon,
	create: () => import('./ArticleCreate'),
	list: () => import('./ArticleList'),
	show: () => import('./ArticleShow'),
	edit: () => import('./ArticleEdit'),
}
