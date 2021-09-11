import { Type } from '@nestjs/common'
import { Routes } from '@nestjs/core'
import { isFunction } from 'lodash'
import { AuthModule } from './auth/auth.module'
import { ResourcesModule } from './resources/resources.module'

export const routes: Routes = [
	{
		path: 'api',
		children: [
			{
				path: 'auth',
				module: AuthModule,
			},
			{
				path: 'resources',
				module: ResourcesModule,
			},
		],
	},
]

const isRoutes = (arr: Routes | Type[]): arr is Routes => (
	arr[0] && !isFunction(arr[0])
)

const findModules = (routes: Routes): Type[] => (
	routes.flatMap(({ module, children }) => {
		const modules: Type[] = []

		if (module) {
			modules.push(module)
		}

		if (children?.length) {
			const childModules = isRoutes(children)
				? findModules(children) : children

			modules.push(...childModules)
		}

		return modules
	})
)

export const routeModules = findModules(routes)
