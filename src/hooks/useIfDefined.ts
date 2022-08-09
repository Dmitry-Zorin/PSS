import { useEffect, useState } from 'react'

export default function useIfDefined<T>(data: T) {
	const [_data, setData] = useState<T>(data)

	useEffect(() => {
		if (data) {
			setData(data)
		}
	}, [data])

	return _data
}
