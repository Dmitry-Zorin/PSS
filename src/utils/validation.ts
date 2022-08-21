import { z } from 'zod'

export function transformEmptyStringToUndefined() {
	return z.literal('').transform(() => undefined)
}

export function preprocessToNumber(schema: z.ZodNumber) {
	return z.preprocess<z.ZodNumber>((e) => {
		switch (typeof e) {
			case 'number':
				return e
			case 'string':
				return e === '' ? undefined : +e
			default:
				return undefined
		}
	}, schema)
}
