export interface TokenService {
	sign: (payload: Record<string, boolean | number | string>, expiresIn?: number | string) => string,
	verify: (token: string) => Record<string, boolean | number | string>
}
