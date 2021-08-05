import { Document, Projection } from 'mongodb'

interface PaginationPipelineOptions {
	match?: any,
	sort?: any,
	skip?: number,
	limit?: number,
	projection?: Projection<Document>
}

const createPaginationPipeline = (options: PaginationPipelineOptions) => {
	const { match, sort, skip, limit, projection } = options
	return [
		match && { $match: match },
		sort && { $sort: sort },
		{
			$facet: {
				count: [{ $count: 'total' }],
				documents: [
					limit && { $limit: limit },
					skip && { $skip: skip },
					projection && { $project: projection },
				].filter(Boolean),
			},
		},
		{
			$project: {
				total: { $ifNull: [{ $arrayElemAt: ['$count.total', 0] }, 0] },
				documents: 1,
			},
		},
	].filter(Boolean)
}

export default createPaginationPipeline
