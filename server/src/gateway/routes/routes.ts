import { Routes } from '@nestjs/core'
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

export default routes
