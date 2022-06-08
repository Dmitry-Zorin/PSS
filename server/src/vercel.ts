import { NestApplicationOptions } from '@nestjs/common'
import { VercelRequest, VercelResponse } from '@vercel/node'
import { FastifyInstance } from 'fastify'
import getApp from './app'

let instance: FastifyInstance

const isProd = process.env.NODE_ENV === 'production'

const options: NestApplicationOptions = {
	...(isProd && {
		logger: ['error', 'warn'],
	}),
}

export default async function (req: VercelRequest, res: VercelResponse) {
	if (!instance) {
		const app = await getApp(options)
		await app.init()
		instance = app.getHttpAdapter().getInstance()
		await instance.ready()
	}
	instance.server.emit('request', req, res)
}
