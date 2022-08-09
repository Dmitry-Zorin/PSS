// import { toNumber } from 'lodash'
import { z } from 'zod'

export function transformEmptyStringToUndefined() {
	return z.literal('').transform(() => undefined)
}

export function preprocessToNumber(schema: z.ZodTypeAny) {
	return z.preprocess((e) => +(e as string) || false, schema)
}
