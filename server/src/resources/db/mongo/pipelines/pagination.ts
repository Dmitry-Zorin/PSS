export interface PaginationOptions {
	match?: any,
	sort?: any,
	skip?: number,
	limit?: number,
}

export const PaginationPipeline = (options: PaginationOptions) => {
	const { match, sort, skip, limit } = options
	return [
		{ $match: match },
		{ $sort: sort },
		{
			$facet: {
				count: [{ $count: 'total' }],
				documents: [
					{ $limit: limit },
					{ $skip: skip },
				],
			},
		},
		{
			$project: {
				total: { $ifNull: [{ $arrayElemAt: ['$count.total', 0] }, 0] },
				documents: 1,
			},
		},
	]
}
