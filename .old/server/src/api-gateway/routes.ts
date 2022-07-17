import { AuthModule } from './controllers/auth/auth.module'
import { ResourcesModule } from './controllers/resources/resources.module'

export default [
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
