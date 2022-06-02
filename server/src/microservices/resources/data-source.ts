import { DataSource } from 'typeorm'
import { baseTypeOrmOptions } from './resources.module'

export default new DataSource({
	...baseTypeOrmOptions,
	url: process.env.RESOURCES_POSTGRES_URL,
	migrations: ['src/microservices/resources/migrations/*'],
})
