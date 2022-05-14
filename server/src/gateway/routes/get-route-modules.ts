import { Type } from '@nestjs/common'
import { Routes } from '@nestjs/core'
import { isFunction } from 'lodash'

const isRoutes = (arr: Routes | Type[]): arr is Routes => (
	arr[0] && !isFunction(arr[0])
)

const findRouteModules = (routes: Routes): Type[] => (
	routes.flatMap(({ module, children }) => {
		const modules: Type[] = []

		if (module) {
			modules.push(module)
		}

		if (children?.length) {
			const childModules = isRoutes(children)
				? findRouteModules(children)
				: children

			modules.push(...childModules)
		}

		return modules
	})
)

export default findRouteModules
