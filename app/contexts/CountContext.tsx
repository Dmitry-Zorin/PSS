import { sum } from 'lodash'
import type { ReactNode } from 'react'
import { createContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { fetchApi } from '~/requests'

interface CountContextState {
	getTotalCount: () => number | undefined
	getResourceCount: (resource: string) => number | undefined
	setResourceCount: (resource: string, count: number) => void
}

export const CountContext = createContext({
	getTotalCount: () => undefined,
	getResourceCount: () => undefined,
	setResourceCount: () => {},
} as CountContextState)

export const CountContextProvider = ({ children }: { children: ReactNode }) => {
	const [count, setCount] = useState({} as Record<string, number>)

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
				getResourceCount: (resource) => count[resource] || 0,
				setResourceCount: (resource, count) => {
					setCount((e) => ({ ...e, [resource]: count }))
				},
			}}
		>
			{children}
		</CountContext.Provider>
	)
}
