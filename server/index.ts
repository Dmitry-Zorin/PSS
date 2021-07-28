import createApp from './app/express'
import getDbService, { getFileService } from './db/mongo'
import { createEnvError } from './errors'
import logger from './logger'

const { SERVER } = process.env

if (!SERVER) {
	throw createEnvError('server')
}

const { port, hostname } = new URL(SERVER)

getFileService().then(async (fileService) => {
	const dbService = await getDbService(fileService)
	const app = createApp(dbService)
	app.listen(+port, hostname, () => {
		logger.succeed('Server is running')
	})
})
