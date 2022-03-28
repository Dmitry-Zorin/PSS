const Styles = {
	photo: {
		'& > img': {
			width: '100%',
			maxHeight: 380,
			objectFit: 'contain',
		},
	},
	rightSide: {
		display: 'flex',
		flexDirection: 'column',
		'& > div': {
			flex: 1,
		},
	},
	stepper: {
		width: '100%',
	},
	table: {
		borderTop: '1px solid #ddd',
		'& td': {
			textAlign: 'center !important',
		},
	},
	widthOneThird: {
		width: '33%',
	},
	widthOneQuarter: {
		width: '25%'
	},
	textSecondary: {
		fontStyle: 'italic',
		color: '#737373',
	},
	subtitle: {
		marginTop: 60,
		fontSize: '1.1rem',
	},
}

export default Styles
