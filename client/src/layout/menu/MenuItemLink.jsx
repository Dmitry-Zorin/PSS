import { experimental_sx } from '@mui/material'
import { styled } from '@mui/system'
import { MenuItemLink as RaMenuItemLink } from 'react-admin'

export const MenuItemLink = styled(RaMenuItemLink)(({ theme }) => {
	return experimental_sx({
		height: 42,
		borderRadius: `0 ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0`,
		my: 0.5,
		'&.RaMenuItemLink-active': {
			'&, > *': {
				color: theme.palette.primary.main,
				'&:hover': {
					// color: colors.primaryLight,
				},
			},
		},
	})
})
