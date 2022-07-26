import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import prisma from 'lib/prisma'
import { isNumber, isString } from 'lodash'
import { NextApiRequest, NextApiResponse } from 'next'

function getSearch(search: string) {
	const wordsArray = search.trim().split(' ')
	return {
		AND: wordsArray.flatMap((word) => ({
			OR: [
				{ title: { contains: word, mode: 'insensitive' } },
				{ description: { contains: word, mode: 'insensitive' } },
			],
		})),
	}
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const { category, search, sort, id, skip = 0, take = 10 } = req.query

	try {
		if (isString(id) && isNumber(+id)) {
			return res.status(200).json(
				await prisma.publication.findUniqueOrThrow({
					where: {
						id: +id,
					},
				}),
			)
		}

		res.status(200).json(
			await prisma.publication.findMany({
				where: {
					AND: [
						{ category, id },
						search ? (getSearch(search as string) as any) : {},
					],
				},
				orderBy: [
					sort && JSON.parse(sort as string),
					{ year: 'desc' },
					{ createdAt: 'desc' },
				],
				skip: 0,
				take: 10,
			}),
		)
	} catch (e) {
		if (e instanceof PrismaClientKnownRequestError) {
			return res.status(404).send('Not Found')
		}
		res.status(500).send('Internal Server Error')
	}
}
