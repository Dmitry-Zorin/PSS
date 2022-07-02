import { alpha, Box, BoxProps } from '@mui/material'
import { forwardRef, Ref } from 'react'

export interface ScrollableProps extends BoxProps {
	scrollbarWidth?: number
}

const Scrollable = forwardRef(
	(
		{ scrollbarWidth = 16, sx, ...props }: ScrollableProps,
		ref: Ref<HTMLElement | undefined>,
	) => (
		<Box
			ref={ref}
			overflow="overlay"
			sx={({ palette }) => ({
				// color: '#0000',
				transition: 'color .5s ease',
				'> *': {
					color: 'text.primary',
				},
				':hover': {
					color: alpha(palette.divider, 0.5),
				},
				'::-webkit-scrollbar': {
					bgcolor: 'transparent',
					width: scrollbarWidth,
				},
				'::-webkit-scrollbar-thumb': {
					boxShadow: `inset 0 0 0 ${scrollbarWidth}px`,
				},
				'::-webkit-scrollbar-thumb:hover': {
					bgcolor: alpha(palette.divider, 0.2),
				},
				'::-webkit-scrollbar-thumb:active': {
					bgcolor: alpha(palette.divider, 0.4),
				},
				...sx,
			})}
			{...props}
		/>
	),
)

export default Scrollable
