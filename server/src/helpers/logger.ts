import ora from 'ora'

const { NODE_ENV } = process.env

const oraLogger = ora({ stream: process.stdout })

const disabledLogger: any = new Proxy({}, {
	get: () => () => {},
})

const logger: Readonly<typeof oraLogger> = (
	NODE_ENV === 'test' ? disabledLogger : oraLogger
)

export default logger
