import { DataSource } from 'typeorm'
import { baseTypeOrmOptions } from './auth.module'

export default new DataSource({
	...baseTypeOrmOptions,
	url: process.env.AUTH_POSTGRES_URL,
	migrations: ['src/microservices/auth/migrations/*'],
})
