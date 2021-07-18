import { BadRequestError } from '../errors.js'

export default ({ query }, res, next) => {
	try {
		for (let [param, value] of Object.entries(query)) {
			value = JSON.parse(value)
			
			switch (param) {
				case 'filter':
					query[param] = value
					break
				
				case 'sort':
					query[param] = { [value[0]]: value[1] }
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
	catch (err) {
		next(new BadRequestError('Invalid query parameters'))
	}
}
