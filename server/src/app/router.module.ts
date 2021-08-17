import { DynamicModule, Module } from '@nestjs/common'
import { RouterModule as NestRouterModule, Routes } from '@nestjs/core'
import { AuthModule } from '../routes/auth/auth.module'
import { ResourcesModule } from '../routes/resources/resources.module'
import { UsersModule } from '../routes/users/users.module'

const routes: Routes = [
	{
		path: 'api',
		module: ResourcesModule,
		children: [
			{
				path: 'auth',
				module: AuthModule,
			},
			{
				path: 'users',
				module: UsersModule,
			},
		],
	},
]

const findModules = (routes: Routes = []): DynamicModule[] => (
	routes.flatMap(route => [
		...[ route.module ].filter(Boolean),
		...findModules(route.children as Routes),
	] as DynamicModule[])
)

@Module({
	imports: [
		...findModules(routes),
		NestRouterModule.register(routes),
	],
})
export class RouterModule {}
