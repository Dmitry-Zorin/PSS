export async function getSafeAsync<T>(fn: () => Promise<T>) {
	const response: { data?: T; error?: unknown } = {}
	try {
		response.data = await fn()
	} catch (err) {
		response.error = err
	}
	return response
}
