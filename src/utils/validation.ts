import { z } from 'zod'

export function transformEmptyStringToUndefined() {
	return z.literal('').transform(() => undefined)
}

export function preprocessToNumber(schema: z.ZodTypeAny) {
	return z.preprocess(
		(e) => (typeof e === 'string' ? +e || false : false),
		schema,
	)
}
