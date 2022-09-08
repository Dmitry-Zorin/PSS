export function getSearchFilter<T>(
	search: string | undefined,
	fields: (keyof T)[],
) {
	return search
		? {
				AND: search
					.trim()
					.split(/\s+/)
					.flatMap((word) => ({
						OR: fields.map((field) => ({
							[field]: { contains: word, mode: 'insensitive' },
						})),
					})),
		  }
		: {}
}
