import { createTheme } from '@mui/material'
import createMixins from '@mui/material/styles/createMixins'

const customMixins = {
	// Add custom mixins here
}

type CustomMixins = typeof customMixins

declare module '@mui/material/styles' {
	interface Mixins extends CustomMixins {}
	interface MixinsOptions extends CustomMixins {}
}

const { breakpoints } = createTheme()

export default createMixins(breakpoints, customMixins)
