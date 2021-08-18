import { Injectable, NotFoundException } from '@nestjs/common'
import { Document } from 'mongodb'
import { NoValidPropsException } from '../../errors'
import { projectNonNullishProps } from '../../utils'
import projections, { fileIdProjection } from './projections'

@Injectable()
export class ProjectionsService {
	readonly fileIdProjection = fileIdProjection
	private readonly projections = projections

	getResourceProjection(resource: string) {
		const projection = this.projections[resource]
		if (!projection) {
			throw new NotFoundException()
		}
		return projection
	}

	getProjectedDocument(resource: string, document: Document) {
		const projection = this.getResourceProjection(resource)
		const payload = projectNonNullishProps(document, projection)
		if (!payload) {
			throw new NoValidPropsException()
		}
		return payload
	}
}
