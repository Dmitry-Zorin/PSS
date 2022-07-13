import { CountContext } from '~/contexts/CountContext'
import { useContext, useEffect } from 'react'
import { useListContext, useResourceContext } from 'react-admin'

const ResourceCounter = () => {
	const { data } = useListContext()
	const resource = useResourceContext()
	const { getResourceCount, setResourceCount } = useContext(CountContext)
	const count = getResourceCount(resource)

	useEffect(() => {
		if (data && count !== data.length) {
			setResourceCount(resource, data.length)
		}
	}, [count, data, resource, setResourceCount])

	return null
}

export default ResourceCounter
