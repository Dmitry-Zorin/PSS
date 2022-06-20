const constants = {
	appBar: {
		height: 54,
	},
	// sidebar: {
	// 	width: 300,
	// 	closedWidth: 54,
	// },
}

export default constants

type Constants = typeof constants

declare module '@mui/material/styles' {
	interface Theme extends Constants {}
}
