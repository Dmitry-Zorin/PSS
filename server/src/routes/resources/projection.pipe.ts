import { ArgumentMetadata, Injectable, NotFoundException, PipeTransform } from '@nestjs/common'
import { mapValues } from 'lodash'
import * as projections from '../../projections'

const projectionExtension = {
	_id: 0,
	id: '$_id',
	createdAt: {
		$toDate: '$_id',
	},
	file: 1,
}

const extendedProjections: Record<string, any> = (
	mapValues(projections, (projection) => (
		{ ...projection, ...projectionExtension }
	))
)

@Injectable()
export class ProjectionPipe implements PipeTransform {
	transform(value: any, metadata: ArgumentMetadata) {
		const projection = extendedProjections[value]
		if (!projection) {
			throw new NotFoundException('Resource not found')
		}
		return projection
	}
}
