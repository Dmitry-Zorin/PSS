import React from 'react'

export const HeadlineField = ({ source, record = {} }) => {
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
