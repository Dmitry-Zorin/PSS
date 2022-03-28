import React from 'react'

// const useStyles = makeStyles({
// 	headline: {
// 		fontSize: '1.2em',
// 		display: 'inline-block',
// 		minWidth: '12rem',
// 	},
// })

export const HeadlineField = ({ source, record = {} }) => {
	// const classes = useStyles()
	return (
		<div>
			{record[source]}
		</div>
	)
}

export const DescriptionField = ({ source, maxchars = 300, record = {} }) => {
	let description = record[source]
	if (description && description.length > maxchars) {
		description = `${description.slice(0, maxchars)}…`
	}
	return (
		<div>
			{description}
		</div>
	)
}
