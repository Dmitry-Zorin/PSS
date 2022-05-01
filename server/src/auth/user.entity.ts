import { Column, Entity, PrimaryColumn } from 'typeorm'

enum Role {
	User = 'user',
	Admin = 'admin'
}

export enum Locale {
	En = 'en',
	Ru = 'ru',
}

export enum Theme {
	Light = 'light',
	Dark = 'dark',
}

@Entity()
export class User {
	@PrimaryColumn()
	username: string

	@Column()
	password: string

	@Column({ type: 'enum', enum: Role, default: Role.User })
	role?: Role

	@Column({ type: 'enum', enum: Locale, default: Locale.En })
	locale?: Locale

	@Column({ type: 'enum', enum: Theme, default: Theme.Light })
	theme?: Theme
}
