import { MAX_PER_PAGE } from 'constants/app'
import { preprocessToNumber } from 'utils/validation'
import { z } from 'zod'

const _common = {
	id: preprocessToNumber(z.number().int()),
	search: z.string(),
	page: preprocessToNumber(z.number().int()),
	perPage: preprocessToNumber(z.number().int().max(MAX_PER_PAGE)),
}

export const common = {
	..._common,
	ids: _common.id.array().min(1).max(100),
}

export const idSchema = z.strictObject({
	id: common.id,
})

export type Id = z.infer<typeof idSchema>['id']
