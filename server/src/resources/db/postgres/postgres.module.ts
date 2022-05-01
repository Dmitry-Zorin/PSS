import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import * as entities from './entities'
import * as adminEntities from './entities/admin'
import { File } from './entities/file.entity'
import { PostgresService } from './postgres.service'

@Module({
	imports: [
		ConfigModule.forRoot(),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({
				type: 'postgres',
				url: configService.get('POSTGRES_URL'),
				entities: [
					...Object.values(entities),
					...Object.values(adminEntities),
					File,
				],
				synchronize: true,
				logging: true
			}),
			inject: [ConfigService],
		}),
	],
	providers: [PostgresService],
	exports: [PostgresService],
})
export class PostgresModule {}
