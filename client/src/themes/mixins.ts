import { createTheme } from '@mui/material'
import createMixins from '@mui/material/styles/createMixins'

const MAIN_AREA_MAX_WIDTH = 700
const MAIN_AREA_PADDING_X = 16

const { breakpoints } = createTheme()

const customMixins = {
	mainArea: {
		maxWidth: MAIN_AREA_MAX_WIDTH,
		padding: `0 ${MAIN_AREA_PADDING_X}px`,
		marginLeft: 'auto',
		marginRight: 'auto',
		// marginRight: `max(0px, calc(50vw - ${MAIN_AREA_MAX_WIDTH / 2}px - ${
		// 	MAIN_AREA_PADDING_X + 2 * SPACING
		// }px))`,
	},
}

export default createMixins(breakpoints, customMixins)

type CustomMixins = typeof customMixins

declare module '@mui/material/styles' {
	interface Mixins extends CustomMixins {}
	interface MixinsOptions extends CustomMixins {}
}
