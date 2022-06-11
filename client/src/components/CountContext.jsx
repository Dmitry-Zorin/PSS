import { sum } from 'lodash'
import { createContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { fetchApi } from 'requests'

export const CountContext = createContext({
	getTotalCount: () => null,
	getResourceCount: () => null,
	setResourceCount: () => {},
})

export const CountContextProvider = ({ children }) => {
	const [count, setCount] = useState({})

	const { data } = useQuery(['count'], async () => fetchApi('resources/count'))

	useEffect(() => {
		if (data) {
			setCount(data.json)
		}
	}, [data])

	return (
		<CountContext.Provider
			value={{
				getTotalCount: () => sum(Object.values(count)),
				getResourceCount: (resource) => count[resource],
				setResourceCount: (resource, count) => {
					setCount((e) => ({ ...e, [resource]: count }))
				},
			}}
		>
			{children}
		</CountContext.Provider>
	)
}
