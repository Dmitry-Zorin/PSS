import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import * as entities from './entities'
import { PostgresService } from './postgres.service'

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			name: 'resourcesConnection',
			useFactory: (configService: ConfigService) => ({
				type: 'postgres',
				url: configService.get('POSTGRES_URL'),
				entities: Object.values(entities),
				synchronize: true,
				logging: true,
			}),
			inject: [ConfigService],
		}),
		TypeOrmModule.forFeature(
			Object.values(entities),
			'resourcesConnection'
		),
	],
	providers: [PostgresService],
	exports: [PostgresService],
})
export class PostgresModule {}
