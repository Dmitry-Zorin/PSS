import { preprocessToNumber } from 'utils/validation'
import { z } from 'zod'

export const idSchema = z.strictObject({
	id: preprocessToNumber(z.number().int()),
})

export type Id = z.infer<typeof idSchema>['id']
