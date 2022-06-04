import { CountContext } from 'components/CountContext'
import { useContext, useEffect } from 'react'
import { useListContext, useResourceContext } from 'react-admin'

export const ResourceCounter = () => {
	const { data } = useListContext()
	const resource = useResourceContext()
	const { getResourceCount, setResourceCount } = useContext(CountContext)
	const count = getResourceCount(resource)

	useEffect(() => {
		if (data && count !== data.length) {
			setResourceCount(resource, data.length)
		}
	}, [data])

	return null
}
