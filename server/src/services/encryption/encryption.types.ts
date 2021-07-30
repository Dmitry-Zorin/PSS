export interface EncryptionService {
	hash: (string: string, salt?: number) => Promise<null | string>,
	compare: (string: string, hash: string) => Promise<boolean>
}
