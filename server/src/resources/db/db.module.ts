import { Module } from '@nestjs/common'
import { DbService } from './db.service'
import { PostgresModule } from './postgres/postgres.module'
import { PostgresService } from './postgres/postgres.service'

interface Options {
	db: 'postgres'
}

@Module({})
export class DbModule {
	private static readonly dbs = {
		// mongo: {
		// 	module: MongoModule,
		// 	service: MongoService,
		// },
		postgres: {
			module: PostgresModule,
			service: PostgresService,
		},
	}

	static forRoot(options: Options) {
		const { module, service } = this.dbs[options.db]
		return {
			module: DbModule,
			imports: [module],
			providers: [
				{
					provide: DbService,
					useClass: service,
				},
			],
			exports: [DbService],
		}
	}
}
