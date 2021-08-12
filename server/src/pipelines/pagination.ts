import { values } from 'lodash'
import { filter } from 'lodash/fp'
import { Projection } from '../services/types'

interface PaginationPipelineOptions {
	match?: any,
	sort?: any,
	skip?: number,
	limit?: number,
	projection?: Projection
}

const filterPipeline = filter((e: object) => values(e)[0])

const getPaginationPipeline = (options: PaginationPipelineOptions) => {
	const { match, sort, skip, limit, projection } = options
	return filterPipeline([
		{ $match: match },
		{ $sort: sort },
		{
			$facet: {
				count: [{ $count: 'total' }],
				documents: filterPipeline([
					{ $limit: limit },
					{ $skip: skip },
					{ $project: projection },
				]),
			},
		},
		{
			$project: {
				total: { $ifNull: [{ $arrayElemAt: ['$count.total', 0] }, 0] },
				documents: 1,
			},
		},
	])
}

export default getPaginationPipeline
