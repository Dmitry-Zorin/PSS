import { VercelRequest, VercelResponse } from '@vercel/node'
import { FastifyInstance } from 'fastify'
import getApp from './get-app'

let instance: FastifyInstance

export default async function (req: VercelRequest, res: VercelResponse) {
	if (!instance) {
		const app = await getApp()
		await app.init()
		instance = app.getHttpAdapter().getInstance()
		await instance.ready()
	}
	instance.server.emit('request', req, res)
}
