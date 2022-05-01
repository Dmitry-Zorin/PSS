export const characters = {
	create: () => import('./CharacterCreate'),
	list: () => import('./CharacterList'),
	edit: () => import('./CharacterEdit'),
}
