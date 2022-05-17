import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm'
import { User } from './user.entity'

export enum Locale {
	En = 'en',
	Ru = 'ru',
}

export enum Theme {
	Light = 'light',
	Dark = 'dark',
}

@Entity()
export class Settings {
	@OneToOne(() => User, e => e.settings)
	@JoinColumn()
	user: User

	@PrimaryColumn()
	userId: string

	@Column({ type: 'enum', enum: Locale, default: Locale.En })
	locale?: Locale

	@Column({ type: 'enum', enum: Theme, default: Theme.Light })
	theme?: Theme
}
