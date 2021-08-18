import { values } from 'lodash'
import { filter } from 'lodash/fp'
import { DocumentProjection, Pipeline } from '../mongo.types'

export interface PaginationPipelineOptions {
	match?: any,
	sort?: any,
	skip?: number,
	limit?: number,
	projection?: DocumentProjection
}

const filterPipeline = filter((e: object) => values(e)[0])

export const getPaginationPipeline = (options: PaginationPipelineOptions): Pipeline => {
	const { match, sort, skip, limit, projection } = options
	return filterPipeline([
		{ $match: match },
		{ $sort: sort },
		{
			$facet: {
				count: [ { $count: 'total' } ],
				documents: filterPipeline([
					{ $limit: limit },
					{ $skip: skip },
					{ $project: projection },
				]),
			},
		},
		{
			$project: {
				total: { $ifNull: [ { $arrayElemAt: [ '$count.total', 0 ] }, 0 ] },
				documents: 1,
			},
		},
	])
}
