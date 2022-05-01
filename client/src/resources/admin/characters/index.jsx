import WorkspacesIcon from '@mui/icons-material/Workspaces'

export const characters = {
	icon: WorkspacesIcon,
	create: () => import('./CharacterCreate'),
	list: () => import('./CharacterList'),
	edit: () => import('./CharacterEdit'),
}
