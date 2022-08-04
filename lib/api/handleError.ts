import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import { NextApiRequest, NextApiResponse } from 'next'

export default function handleError(
	e: unknown,
	_req: NextApiRequest,
	res: NextApiResponse,
) {
	console.error(e)
	if (e instanceof PrismaClientKnownRequestError) {
		return res.status(404).send('Not Found')
	}
	throw e
}
