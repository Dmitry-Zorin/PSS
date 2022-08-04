import { Author } from '@prisma/client'
import { createHandler, prisma } from 'lib/api'
import { NextApiResponse } from 'next'
import { GetListResponse } from 'types'
import { getSearchFilter, parseQuery } from 'utils'

const handler = createHandler()

handler.get(
	async (req, res: NextApiResponse<Author | GetListResponse<Author>>) => {
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

		const records = await prisma.author.findMany({
			where,
			orderBy: [sort && JSON.parse(sort), { lastName: 'desc' }],
			skip,
			take,
		})

		res.json({ records, total })
	},
)

export default handler
