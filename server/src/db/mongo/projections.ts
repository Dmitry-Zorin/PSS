import { mapValues } from 'lodash'
import { DocumentProjection, Projections } from './mongo.types'
import * as resourceProjections from './projections/index'

export const defaultProjection = {
	title: 1,
	description: 1,
	type: 1,
	year: 1,
	volume: 1,
	authors: 1,
	character: 1,
	exitData: 1,
} as const

const baseProjection = {
	_id: 0,
	id: {
		$toString: '$_id',
	},
	createdAt: {
		$toDate: '$_id',
	},
	file: 1,
} as const

export const fileIdProjection = {
	file: {
		id: 1,
	},
} as const

type TransformFunction<T> = (value: T, key?: string, collection?: Record<string, T>) => T
type TransformProjectionFunction = TransformFunction<DocumentProjection>

const mapResourceProjections = (transformer: TransformProjectionFunction): Projections => (
	mapValues(resourceProjections as Projections, transformer)
)

const mergeWithBaseProjection = (projection: DocumentProjection): DocumentProjection => (
	{ ...baseProjection, ...projection }
)

const projections = mapResourceProjections(mergeWithBaseProjection)

export default projections
