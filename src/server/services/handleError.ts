import {
	PrismaClientKnownRequestError,
	PrismaClientValidationError,
} from '@prisma/client/runtime'
import { HttpError } from 'http-errors'
import { NextApiRequest, NextApiResponse } from 'next'
import { ZodError } from 'zod'

export default function handleError(
	err: unknown,
	_req: NextApiRequest,
	res: NextApiResponse,
) {
	console.error(err)
	if (err instanceof ZodError) {
		return res.status(400).send(`Неверный формат данных: ${err.message}`)
	}
	if (err instanceof PrismaClientValidationError) {
		return res.status(400).send('Неверный формат данных')
	}
	if (err instanceof PrismaClientKnownRequestError) {
		// return res.status().send()
	}
	if (err instanceof HttpError) {
		return res.status(err.status).send(err.message)
	}
	res.status(500).send('Ошибка на сервере')
}
