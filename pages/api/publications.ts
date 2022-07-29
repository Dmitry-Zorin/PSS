import { Publication } from '@prisma/client'
import { createApiHandler, prisma } from 'lib'
import { NextApiRequest, NextApiResponse } from 'next'
import { getSearchFilter, parseQuery } from 'utils'

export default createApiHandler(
	async (req: NextApiRequest, res: NextApiResponse) => {
		const { strings, numbers } = parseQuery(req.query)
		const { category, search, sort } = strings
		const { id, skip, take = 25 } = numbers

		if (id) {
			return res.json(
				await prisma.publication.findUniqueOrThrow({
					where: { id },
				}),
			)
		}

		res.json(
			await prisma.publication.findMany({
				where: {
					AND: [
						{ category },
						getSearchFilter<Publication>(search, ['title', 'description']),
					],
				},
				orderBy: [
					sort && JSON.parse(sort),
					{ year: 'desc' },
					{ createdAt: 'desc' },
				],
				skip,
				take,
			}),
		)
	},
)
