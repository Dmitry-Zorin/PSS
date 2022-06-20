import { experimental_sx, styled } from '@mui/material'
import { MenuItemLink as RaMenuItemLink } from 'react-admin'

const MenuItemLink = styled(RaMenuItemLink)(({ theme }) => {
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

export default MenuItemLink
