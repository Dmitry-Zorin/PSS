import { Injectable, ValidationPipe } from '@nestjs/common'
import { capitalize } from 'lodash'
import { singular } from 'pluralize'
import { UpdateDto } from './dto'
import * as resources from './dto/resources'

@Injectable()
export class PayloadValidationPipe extends ValidationPipe {
	async transform(value: UpdateDto) {
		const dtoName = `${capitalize(singular(value.resource))}Dto`
		const dto = (resources as any)?.[dtoName] || resources.ResourceItemDto
		return {
			...value,
			payload: await super.transform(value.payload, {
				type: 'body',
				metatype: dto,
			}),
		}
	}
}
