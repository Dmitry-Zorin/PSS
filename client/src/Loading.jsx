import { Box, CircularProgress } from '@mui/material'
import React, { useEffect, useState } from 'react'

const defaultSpinner = <CircularProgress />

const Loading = ({ spinner = defaultSpinner }) => {
	const [loading, setLoading] = useState(null)

	useEffect(() => {
		const timeout = setTimeout(() => setLoading(spinner), 200)
		return () => clearTimeout(timeout)
	}, [])

	return (
		<Box display="flex" height="100vh">
			<Box margin="auto">{loading}</Box>
		</Box>
	)
}

export default Loading
