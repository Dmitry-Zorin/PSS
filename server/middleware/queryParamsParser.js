export default ({ query }, res, next) => {
	for (let [param, value] of Object.entries(query)) {
		value = JSON.parse(value)
		
		switch (param) {
			case 'filter':
				query[param] = value
				break
			
			case 'sort':
				const sortKey = value[0].replace('firstCreationDate', 'createdAt')
				const sortValue = +value[1].replace('ASC', 1).replace('DESC', -1)
				query[param] = { [sortKey]: sortValue }
				break
			
			case 'range':
				query.skip = value[0]
				query.limit = value[1] + 1
				break
			
			default:
				query[param] = value
		}
	}
	next()
}
