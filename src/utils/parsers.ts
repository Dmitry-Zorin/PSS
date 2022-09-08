import httpError from 'http-errors'
import { idSchema } from 'validations/common'
import { z } from 'zod'

function formatError(error: z.ZodError) {
	return JSON.stringify(error.flatten(), null, 2)
}

export function parseId(query: unknown) {
	const result = idSchema.safeParse(query)
	if (!result.success) {
		throw new httpError.BadRequest('Неверный формат ID')
	}
	return result.data.id
}

export function parseQuery<T extends z.ZodSchema>(schema: T, query: unknown) {
	const result = schema.safeParse(query)
	if (!result.success) {
		throw new httpError.BadRequest(
			`Неверные параметры запроса: ${formatError(result.error)}`,
		)
	}
	return result.data as z.infer<T>
}

export function parseBody<T extends z.ZodSchema>(schema: T, body: unknown) {
	const result = schema.safeParse(body)
	if (!result.success) {
		throw new httpError.BadRequest(
			`Неверное тело запроса: ${formatError(result.error)}`,
		)
	}
	return result.data as z.infer<T>
}
