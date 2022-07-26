import { isString } from 'lodash'
import prisma from 'lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const { search } = req.query

	const authors = await prisma.author.findMany({
		take: 10,
		...(isString(search) &&
			(() => {
				const wordsArray = search.trim().split(' ')
				return {
					where: {
						AND: wordsArray.flatMap((word) => ({
							OR: [
								{ lastName: { contains: word, mode: 'insensitive' } },
								{ firstName: { contains: word, mode: 'insensitive' } },
								{ middleName: { contains: word, mode: 'insensitive' } },
							],
						})),
					},
				}
			})()),
	})

	res.status(200).json(authors)
}
