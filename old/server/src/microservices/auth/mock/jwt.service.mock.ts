export const jwtServiceMock = {
	sign: (payload: object) => JSON.stringify(payload),
}

export function parseToken(token: string) {
	return JSON.parse(token)
}
