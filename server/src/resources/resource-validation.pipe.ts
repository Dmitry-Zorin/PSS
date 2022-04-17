import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common'
import { validate } from 'class-validator'
import { plainToInstance } from 'class-transformer'
import { capitalize } from 'lodash'
import { UpdateResourceDto } from './dto'
import { singular } from 'pluralize'
import * as resources from './dto/resources'

@Injectable()
export class ResourceValidationPipe implements PipeTransform {
	async transform(value: UpdateResourceDto) {
		const dtoName = `${capitalize(singular(value.resource))}Dto`
		const dto = (resources as any)?.[dtoName] || resources.ResourceDto
		const errors = await validate(plainToInstance(dto, value.payload))

		if (errors.length) {
			const errorMessage = errors.flatMap(e => (
				Object.values(e?.constraints || [])
			))
			throw new BadRequestException(errorMessage)
		}

		return value
	}
}
