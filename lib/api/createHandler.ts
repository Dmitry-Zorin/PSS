import { handleError } from 'lib/api'
import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'

export default function createHandler() {
	return nc<NextApiRequest, NextApiResponse>({
		onError: (err, req, res) => {
			handleError(err, req, res)
		},
	})
}
