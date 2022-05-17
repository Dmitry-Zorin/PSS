import { Injectable, ValidationPipe } from '@nestjs/common'
import { PartialType } from '@nestjs/mapped-types'
import { capitalize } from 'lodash'
import { singular } from 'pluralize'
import * as resources from './dto/resources'

interface TransformValue {
	resource: string
	id?: string
	payload: Record<string, any>
}

@Injectable()
export class PayloadValidationPipe extends ValidationPipe {
	constructor() {
		super({
			whitelist: true,
			forbidNonWhitelisted: true,
			transform: true,
		})
	}

	transform(value: TransformValue) {
		const dtoName = `${capitalize(singular(value.resource))}Dto`
		const dto = (resources as any)?.[dtoName] || resources.ResourceItemDto

		return super.transform(value.payload, {
			type: 'body',
			metatype: 'id' in value ? PartialType(dto) : dto,
		})
	}
}
