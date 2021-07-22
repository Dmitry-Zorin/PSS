import connectToDB from './db'
import logger from './logger'

const { SERVER } = process.env

if (!SERVER) {
	console.log('Missing server env2 variable. Exiting...')
	process.exit(1)
}

connectToDB()
	.then(async (dbClient) => {
		for (const signal of ['SIGINT', 'SIGHUP', 'SIGTERM']) {
			process.on(signal, async (code) => {
				await dbClient.close()
				process.exit(code)
			})
		}
		
		const { default: server } = await import('./server')
		const { port, hostname } = new URL(SERVER)
		
		server.listen(+port, hostname, () => {
			logger.succeed('Server is running...')
		})
	})
	.catch(err => {
		console.error(err)
		process.exit(1)
	})
