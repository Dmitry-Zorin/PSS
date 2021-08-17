import ora from 'ora'

const { NODE_ENV } = process.env

const oraLogger = ora({ stream: process.stdout })

const disabledLogger = new Proxy<any>({}, {
	get: () => () => {},
})

const logger: Readonly<typeof oraLogger> = (
	NODE_ENV === 'test' ? disabledLogger : oraLogger
)

export default logger
