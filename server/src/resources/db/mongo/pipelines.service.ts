import { Injectable } from '@nestjs/common'
import { flow, isArray, isEmpty, isObject, isUndefined, mapValues, omitBy } from 'lodash/fp'
import * as pipelines from './pipelines'
import { PaginationOptions } from './pipelines/pagination'

type Pipeline = Record<string, any>[]
export type PipelineOptions = Record<string, any>
type PipelineFunction = (options: PipelineOptions) => Pipeline

const cleanPipeline = (pipeline: Pipeline): Pipeline => (
	pipeline.map(omitUndefined).filter(isNotEmpty)
)

@Injectable()
export class PipelinesService {
	private static readonly preparePipeline = cleanPipeline
	private readonly pipelines: Record<string, PipelineFunction> = pipelines as any

	private static getPipeline(pipeline: Pipeline) {
		return this.preparePipeline(pipeline)
	}

	getPaginationPipeline(options: PaginationOptions) {
		const paginationPipeline = this.pipelines.PaginationPipeline(options)
		return PipelinesService.getPipeline(paginationPipeline)
	}
}

const isNotEmpty = (e: any) => !isEmpty(e)

const omitUndefined = (value: any) => {
	if (isArray(value)) {
		return cleanPipeline(value)
	}
	if (isObject(value)) {
		return omitUndefinedDeep(value)
	}
	return value
}
const omitUndefinedDeep: (arg: object) => object = (
	flow([omitBy(isUndefined), mapValues(omitUndefined)])
)
