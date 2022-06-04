import { createContext, useState } from 'react'
import { useQuery } from 'react-query'
import { fetchApi } from 'requests'

export const CountContext = createContext({
	getResourceCount: () => null,
	setResourceCount: () => {},
})

export const CountProvider = ({ children }) => {
	const [count, setCount] = useState({})

	useQuery(['count'], async () => {
		const { json } = await fetchApi('resources/count')
		setCount(json)
	})

	function getResourceCount(resource) {
		return count[resource]
	}

	function setResourceCount(resource, count) {
		setCount((e) => ({ ...e, [resource]: count }))
	}

	return (
		<CountContext.Provider value={{ getResourceCount, setResourceCount }}>
			{children}
		</CountContext.Provider>
	)
}
