import { Box, CircularProgress } from '@mui/material'
import { useEffect, useState } from 'react'

const Loading = ({ spinner = <CircularProgress /> }) => {
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
