import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common'
import { transform } from 'lodash'

@Injectable()
export class ParseQueryPipe implements PipeTransform {
	transform(data: any, metadata: ArgumentMetadata) {
		if (metadata.type !== 'query') {
			return data
		}

		return transform(data as Record<string, string>, (params, value, key) => {
			try {
				params[key] = JSON.parse(value)
			}
			catch {
				throw new BadRequestException(`Query parameter "${key}" has invalid format`)
			}
		}, {} as Record<string, any>)
	}
}
