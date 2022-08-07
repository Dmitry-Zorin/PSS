import {
	PrismaClientKnownRequestError,
	PrismaClientValidationError,
} from '@prisma/client/runtime'
import { NextApiRequest, NextApiResponse } from 'next'

export default function handleError(
	e: unknown,
	_req: NextApiRequest,
	res: NextApiResponse,
) {
	console.error(e)
	if (e instanceof PrismaClientValidationError) {
		return res.status(400).send('Bad Request')
	}
	if (e instanceof PrismaClientKnownRequestError) {
		return res.status(404).send('Not Found')
	}
	res.status(500).send('Internal Server Error')
}
