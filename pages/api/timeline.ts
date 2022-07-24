import prisma from 'lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const publications = await prisma.publication.findMany({
		orderBy: {
			createdAt: 'desc',
		},
		take: 10,
		skip: 0,
	})
	res.status(200).json(publications)
}
