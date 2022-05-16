import { Injectable, ValidationPipe } from '@nestjs/common'
import { PartialType } from '@nestjs/mapped-types'
import { capitalize } from 'lodash'
import { singular } from 'pluralize'
import { CreateDto, UpdateDto } from './dto'
import * as resources from './dto/resources'

@Injectable()
export class PayloadValidationPipe extends ValidationPipe {
	constructor() {
		super({
			whitelist: true,
			forbidNonWhitelisted: true,
			transform: true,
		})
	}

	async transform(value: CreateDto | UpdateDto) {
		const dtoName = `${capitalize(singular(value.resource))}Dto`
		const dto = (resources as any)?.[dtoName] || resources.ResourceItemDto
		const isUpdate = 'id' in value

		return {
			...value,
			payload: await super.transform(value.payload, {
				type: 'body',
				metatype: isUpdate ? PartialType(dto) : dto,
			}),
		}
	}
}
