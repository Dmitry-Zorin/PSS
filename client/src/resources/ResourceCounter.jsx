import { useEffect } from 'react'
import { useListContext, useResourceContext, useStore } from 'react-admin'

const ResourceCounter = () => {
	const { data } = useListContext()
	const resource = useResourceContext()
	const [resourcesCount, setResourcesCount] = useStore('resources.count')

	useEffect(() => {
		if (data && resourcesCount?.[resource] !== data.length) {
			setResourcesCount({
				...resourcesCount,
				[resource]: data.length,
			})
		}
	}, [data])

	return null
}

export default ResourceCounter
