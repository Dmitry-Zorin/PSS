import dbClient from './db.js'
import './env.js'
import logger from './logger.js'
import server from './server.js'

if (!dbClient.isConnected()) {
	process.exit(1)
}

const cleanUpAndExit = async (code = 1) => {
	await dbClient.close()
	logger.succeed('Database connection closed')
	process.exit(code)
}

for (const signal of ['SIGINT', 'SIGHUP', 'SIGUSR2']) {
	process.on(signal, async (code) => {
		logger.prefixText = signal === 'SIGINT' ? '\n' : ''
		await cleanUpAndExit(code)
	})
}

process.on('uncaughtException', async (err) => {
	console.error(err)
	await cleanUpAndExit()
})

const { port, hostname } = new URL(process.env.SERVER)

server.listen(+port, hostname, () => {
	logger.succeed('Server is running')
})
