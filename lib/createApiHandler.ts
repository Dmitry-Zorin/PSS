import { handleError } from 'lib'
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

export default function createApiHandler(handler: NextApiHandler) {
	return async (req: NextApiRequest, res: NextApiResponse) => {
		try {
			handler(req, res)
		} catch (e) {
			handleError(e, res)
		}
	}
}
