import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { values } from 'lodash'
import * as entities from './entities'
import { PostgresService } from './postgres.service'

@Module({
	imports: [
		ConfigModule.forRoot(),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({
				type: 'postgres',
				url: configService.get('POSTGRES_URL'),
				entities: values(entities),
				synchronize: true,
			}),
			inject: [ConfigService],
		}),
	],
	providers: [PostgresService],
	exports: [PostgresService],
})
export class PostgresModule {}
