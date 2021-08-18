export const enum Roles {
	USER,
	ADMIN
}

export interface UserType {
	username: string,
	role: Roles
}
