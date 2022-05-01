export const authors = {
	create: () => import('./AuthorCreate'),
	list: () => import('./AuthorList'),
	show: () => import('./AuthorShow'),
	edit: () => import('./AuthorEdit'),
}
