import { DataSource } from 'typeorm'
import { baseTypeOrmOptions } from './resources.module'

export default new DataSource({
	url: process.env.RESOURCES_POSTGRES_URL,
	...baseTypeOrmOptions,
	migrations: ['src/microservices/resources/migrations/*'],
})
