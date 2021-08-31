import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { values } from 'lodash'
import { PostgresService } from './postgres.service'
import * as entities from './entities'

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
			inject: [ConfigService]
		}),
	],
	providers: [PostgresService],
	exports: [PostgresService],
})
export class PostgresModule {}
