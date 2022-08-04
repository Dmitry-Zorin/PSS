import { Publication } from '@prisma/client'
import { createHandler, prisma } from 'lib/api'
import { NextApiResponse } from 'next'
import { GetPublicationsResponse } from 'types'
import { getSearchFilter, parseQuery } from 'utils'

const handler = createHandler()

handler.get(
	async (req, res: NextApiResponse<Publication | GetPublicationsResponse>) => {
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

		const where = {
			AND: [
				{ category },
				getSearchFilter<Publication>(search, ['title', 'description']),
			],
		}

		const total = await prisma.publication.count({ where })

		const publications = await prisma.publication.findMany({
			where,
			orderBy: [
				sort && JSON.parse(sort),
				{ year: 'desc' },
				{ createdAt: 'desc' },
			],
			skip,
			take,
		})

		res.json({ publications, total })
	},
)

export default handler
