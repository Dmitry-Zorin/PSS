import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common'
import { transform } from 'lodash'

@Injectable()
export class ParseQueryPipe implements PipeTransform {
	static parseQuery(query: Record<string, any>) {
		return transform(query, (result: typeof query, value, key) => {
			try {
				result[key] = JSON.parse(value)
			} catch {
				result[key] = value
			}
		})
	}

	transform(data: any, metadata: ArgumentMetadata) {
		if (metadata.type !== 'query') {
			return data
		}
		return ParseQueryPipe.parseQuery(data)
	}
}
