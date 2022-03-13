import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { values } from 'lodash'
import { FileModule } from '../../file/file.module'
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
		FileModule.forRoot({ storage: 'gridfs' }),
	],
	providers: [PostgresService],
	exports: [PostgresService],
})
export class PostgresModule {}
