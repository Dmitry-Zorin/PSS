import { CircularProgress } from '@mui/material'
import React, { useEffect, useState } from 'react'

const defaultSpinner = (
	<CircularProgress style={{ margin: 'auto' }}/>
)

const Loading = ({ spinner, delay = 200 }) => {
	const [loading, setLoading] = useState(null)
	
	useEffect(() => {
		const timeout = setTimeout(() => {
			setLoading(spinner || defaultSpinner)
		}, delay)
		return () => clearTimeout(timeout)
	}, [])
	
	return loading
}

export default Loading
