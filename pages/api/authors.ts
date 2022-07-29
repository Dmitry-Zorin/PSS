import { Author } from '@prisma/client'
import { createApiHandler, prisma } from 'lib/api'
import { NextApiRequest, NextApiResponse } from 'next'
import { getSearchFilter, parseQuery } from 'utils'

export default createApiHandler(
	async (req: NextApiRequest, res: NextApiResponse) => {
		const { strings, numbers } = parseQuery(req.query)
		const { search, sort } = strings
		const { id, skip, take = 25 } = numbers

		if (id) {
			return res.json(
				await prisma.author.findUniqueOrThrow({
					where: { id },
				}),
			)
		}

		const where = getSearchFilter<Author>(search, [
			'lastName',
			'firstName',
			'middleName',
		])

		const total = await prisma.author.count({ where })

		const authors = await prisma.author.findMany({
			where,
			orderBy: [
				sort && JSON.parse(sort),
				{ year: 'desc' },
				{ createdAt: 'desc' },
			],
			skip,
			take,
		})

		res.json({ authors, total })
	},
)
