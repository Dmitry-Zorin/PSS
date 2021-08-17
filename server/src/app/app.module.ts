import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { number, object, string } from 'joi'
import { RouterModule } from './router.module'

const envSchema = object({
	PORT: number().default(3000),
	UI_SERVER: string().default(false),
	SECRET: string().required(),
	DB_URI: string().required(),
	DB_NAME: string().required(),
	FILE_DB_NAME: string(),
})

@Module({
	imports: [
		ConfigModule.forRoot({ validationSchema: envSchema }),
		RouterModule,
	],
})
export class AppModule {}
