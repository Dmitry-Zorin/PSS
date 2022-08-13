import { z } from 'zod'

export function transformEmptyStringToUndefined() {
	return z.literal('').transform(() => undefined)
}

export function preprocessToNumber(schema: z.ZodNumber) {
	return z.preprocess<z.ZodNumber>(
		(e) => (typeof e === 'string' ? +e || false : false),
		schema,
	)
}
