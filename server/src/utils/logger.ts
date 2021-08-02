import ora from 'ora'

const disabledLogger = new Proxy({}, {
	get: () => () => {},
})

const logger = process.env.NODE_ENV === 'test'
	? disabledLogger as ora.Ora
	: ora({ stream: process.stdout })

export default logger
