export interface EncryptionService {
	hash: (password: string, salt?: number) => Promise<string | null>,
	compare: (password: string, hash: string) => Promise<boolean>
}

export interface TokenService {
	sign: (payload: Record<string, boolean | number | string>) => string
}
